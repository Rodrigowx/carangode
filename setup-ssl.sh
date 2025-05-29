#!/bin/bash

# Script de configuração automática SSL para Carangode
# Configura domínio, gera certificados e ativa renovação automática

set -e  # Parar em caso de erro

echo "🔒 Configuração Automática SSL - Carangode"
echo "=========================================="
echo ""

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
    apt update
    apt install -y nginx
fi

# Verificar se certbot está instalado
if ! command -v certbot &> /dev/null; then
    echo "🔧 Instalando Certbot para Let's Encrypt..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Limpar configurações problemáticas primeiro
echo "🧹 Limpando configurações nginx problemáticas..."
NGINX_CONFIG="/etc/nginx/sites-available/carangode"
NGINX_ENABLED="/etc/nginx/sites-enabled/carangode"

# Remover links e arquivos problemáticos
if [ -L "$NGINX_ENABLED" ]; then
    echo "🗑️ Removendo link problemático..."
    rm -f "$NGINX_ENABLED"
fi

if [ -f "$NGINX_CONFIG" ]; then
    echo "💾 Fazendo backup da configuração anterior..."
    cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
    echo "🗑️ Removendo configuração problemática..."
    rm -f "$NGINX_CONFIG"
fi

# Remover configuração padrão se existir
if [ -L "/etc/nginx/sites-enabled/default" ]; then
    echo "🗑️ Removendo configuração padrão..."
    rm -f /etc/nginx/sites-enabled/default
fi

# Copiar nossa configuração corrigida
echo "📋 Copiando configuração nginx corrigida..."
cp nginx.conf "$NGINX_CONFIG"

# Substituir DOMAIN_PLACEHOLDER pelo domínio real
echo "🔄 Configurando domínio $DOMAIN no nginx..."
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$NGINX_CONFIG"

# Verificar se configuração está válida AGORA
echo "✅ Validando configuração nginx..."
if ! nginx -t; then
    echo "❌ Configuração nginx inválida!"
    echo "🔍 Conteúdo do arquivo problemático:"
    cat "$NGINX_CONFIG"
    exit 1
fi

# Ativar site (criar symlink)
echo "🔗 Ativando site..."
ln -sf "$NGINX_CONFIG" "$NGINX_ENABLED"

# Configurar firewall
echo "🔒 Configurando firewall..."
ufw allow 'Nginx Full' >/dev/null 2>&1 || true

# Verificar e iniciar/recarregar nginx
echo "🔄 Configurando serviço nginx..."

# Verificar se nginx está ativo
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx já está rodando, recarregando..."
    if ! systemctl reload nginx; then
        echo "⚠️ Falha ao recarregar, tentando restart..."
        systemctl restart nginx
    fi
else
    echo "🚀 Nginx não está rodando, iniciando..."
    if ! systemctl start nginx; then
        echo "❌ Falha ao iniciar nginx!"
        echo "🔍 Status do serviço:"
        systemctl status nginx --no-pager -l || true
        echo ""
        echo "🔍 Logs do nginx:"
        journalctl -u nginx --no-pager -l --since "5 minutes ago" || true
        exit 1
    fi
fi

# Habilitar nginx para iniciar com o sistema
systemctl enable nginx >/dev/null 2>&1 || true

# Verificar se nginx está funcionando agora
if ! systemctl is-active --quiet nginx; then
    echo "❌ Nginx ainda não está rodando após tentativas!"
    echo "🔍 Status final:"
    systemctl status nginx --no-pager -l || true
    exit 1
fi

echo "✅ Nginx rodando corretamente"

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
    
    # Em ambiente automatizado (como GitHub Actions), continue sem perguntar
    if [ -t 0 ]; then
        echo "❓ Continuar mesmo assim? (y/N)"
        read -r CONTINUE
        if [[ ! "$CONTINUE" =~ ^[Yy]$ ]]; then
            echo "Configure o DNS primeiro e execute novamente"
            exit 1
        fi
    else
        echo "⚠️ Continuando automaticamente (ambiente não interativo)"
    fi
fi

# Gerar certificados SSL automaticamente
echo "🔐 Gerando certificados SSL..."
echo "   Domínio: $DOMAIN"
echo "   www.$DOMAIN"
echo ""

# Certbot automático (não interativo)
if certbot --nginx \
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
tee /etc/cron.daily/certbot-renew > /dev/null << 'EOF'
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
chmod +x /etc/cron.daily/certbot-renew

# Testar renovação automática
echo "🧪 Testando renovação automática..."
if certbot renew --dry-run --quiet; then
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