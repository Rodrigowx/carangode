#!/bin/bash

# Script de configuração automática SSL para Carangode
# Configura domínio, gera certificados e ativa renovação automática

set -e  # Parar em caso de erro

echo "🔒 Configuração Automática SSL - Carangode"
echo "=========================================="
echo ""

# Verificar se está rodando como root ou com sudo
if [[ $EUID -eq 0 ]]; then
   echo "❌ Não execute como root. Use: ./setup-ssl.sh"
   exit 1
fi

# Pedir domínio se não fornecido como parâmetro
DOMAIN=$1
if [ -z "$DOMAIN" ]; then
    echo "📝 Digite seu domínio (ex: meusite.com):"
    read -r DOMAIN
fi

# Validar formato do domínio
if [[ ! "$DOMAIN" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$ ]]; then
    echo "❌ Formato de domínio inválido: $DOMAIN"
    echo "   Use apenas letras, números, pontos e hífens"
    exit 1
fi

echo "🌐 Configurando domínio: $DOMAIN"
echo ""

# Verificar se nginx está instalado
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx não encontrado. Instalando..."
    sudo apt update
    sudo apt install -y nginx
fi

# Verificar se certbot está instalado
if ! command -v certbot &> /dev/null; then
    echo "🔧 Instalando Certbot para Let's Encrypt..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Backup da configuração atual
NGINX_CONFIG="/etc/nginx/sites-available/carangode"
if [ -f "$NGINX_CONFIG" ]; then
    echo "💾 Fazendo backup da configuração nginx..."
    sudo cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Copiar nginx.conf para sites-available se não existir
if [ ! -f "$NGINX_CONFIG" ]; then
    echo "📋 Copiando configuração nginx..."
    sudo cp nginx.conf "$NGINX_CONFIG"
fi

# Substituir DOMAIN_PLACEHOLDER pelo domínio real
echo "🔄 Configurando domínio $DOMAIN no nginx..."
sudo sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$NGINX_CONFIG"

# Verificar se configuração está válida
echo "✅ Validando configuração nginx..."
if ! sudo nginx -t; then
    echo "❌ Configuração nginx inválida!"
    exit 1
fi

# Ativar site (criar symlink)
if [ ! -L "/etc/nginx/sites-enabled/carangode" ]; then
    echo "🔗 Ativando site..."
    sudo ln -sf "$NGINX_CONFIG" /etc/nginx/sites-enabled/carangode
fi

# Remover configuração padrão se existir
if [ -L "/etc/nginx/sites-enabled/default" ]; then
    echo "🗑️ Removendo configuração padrão..."
    sudo rm -f /etc/nginx/sites-enabled/default
fi

# Configurar firewall
echo "🔒 Configurando firewall..."
sudo ufw allow 'Nginx Full' >/dev/null 2>&1 || true

# Recarregar nginx
echo "🔄 Recarregando nginx..."
sudo systemctl reload nginx

# Verificar se o domínio resolve para este servidor
echo "🌐 Verificando DNS..."
SERVER_IP=$(curl -s ifconfig.me || curl -s icanhazip.com)
DOMAIN_IP=$(dig +short "$DOMAIN" @8.8.8.8 | tail -n1)

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    echo "⚠️ ATENÇÃO: DNS pode não estar configurado corretamente"
    echo "   IP do servidor: $SERVER_IP"
    echo "   IP do domínio:  $DOMAIN_IP"
    echo "   Configure o A record no seu provedor DNS"
    echo ""
    echo "❓ Continuar mesmo assim? (y/N)"
    read -r CONTINUE
    if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
        echo "Configure o DNS primeiro e execute novamente"
        exit 1
    fi
fi

# Gerar certificados SSL automaticamente
echo "🔐 Gerando certificados SSL..."
echo "   Domínio: $DOMAIN"
echo "   www.$DOMAIN"
echo ""

# Certbot automático (não interativo)
if sudo certbot --nginx \
    --domains "$DOMAIN,www.$DOMAIN" \
    --email "admin@$DOMAIN" \
    --agree-tos \
    --no-eff-email \
    --redirect \
    --non-interactive; then
    
    echo "✅ Certificados SSL gerados com sucesso!"
else
    echo "❌ Falha ao gerar certificados SSL"
    echo "   Verifique se:"
    echo "   1. DNS está configurado corretamente"
    echo "   2. Firewall permite conexões HTTP/HTTPS"
    echo "   3. Nginx está rodando"
    exit 1
fi

# Configurar renovação automática
echo "🔄 Configurando renovação automática..."

# Criar script de renovação
sudo tee /etc/cron.daily/certbot-renew > /dev/null << 'EOF'
#!/bin/bash
# Renovação automática de certificados SSL

# Log file
LOG="/var/log/certbot-renew.log"

echo "$(date): Verificando renovação de certificados" >> "$LOG"

# Tentar renovar certificados
if /usr/bin/certbot renew --quiet --nginx; then
    echo "$(date): Renovação concluída com sucesso" >> "$LOG"
    
    # Recarregar nginx se certificados foram renovados
    if systemctl is-active --quiet nginx; then
        systemctl reload nginx
        echo "$(date): Nginx recarregado" >> "$LOG"
    fi
else
    echo "$(date): Erro na renovação" >> "$LOG"
fi
EOF

# Dar permissão de execução
sudo chmod +x /etc/cron.daily/certbot-renew

# Testar renovação automática
echo "🧪 Testando renovação automática..."
if sudo certbot renew --dry-run --quiet; then
    echo "✅ Renovação automática configurada com sucesso!"
else
    echo "⚠️ Teste de renovação falhou, mas certificados foram gerados"
fi

# Verificar status final
echo ""
echo "🎉 Configuração SSL Concluída!"
echo "================================"
echo ""
echo "✅ Domínio configurado: $DOMAIN"
echo "✅ Certificados SSL gerados"
echo "✅ Renovação automática ativada"
echo "✅ Nginx configurado e rodando"
echo ""

# Teste final
echo "🔗 Testando HTTPS..."
if curl -sSf "https://$DOMAIN/health" >/dev/null 2>&1; then
    echo "✅ HTTPS funcionando: https://$DOMAIN"
elif curl -sSf "https://$DOMAIN" >/dev/null 2>&1; then
    echo "✅ HTTPS funcionando: https://$DOMAIN"
else
    echo "⚠️ HTTPS pode não estar funcionando ainda"
    echo "   Aguarde alguns minutos e teste: https://$DOMAIN"
fi

echo ""
echo "📋 Informações importantes:"
echo "• Certificados renovam automaticamente a cada 60 dias"
echo "• Logs da renovação: /var/log/certbot-renew.log"  
echo "• Para forçar renovação: sudo certbot renew --force-renewal"
echo "• Para verificar status: sudo certbot certificates"
echo ""

echo "🚀 Agora inicie suas aplicações:"
echo "./monitor.sh restart" 