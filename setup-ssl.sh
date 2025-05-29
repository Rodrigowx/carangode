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

# ETAPA 1: Configurar nginx apenas com HTTP primeiro
echo "📋 Configurando nginx temporariamente apenas com HTTP..."
cp nginx.conf "$NGINX_CONFIG"

# Substituir domínio
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$NGINX_CONFIG"

# Criar versão HTTP-only temporária
sed -e '/listen 443 ssl/d' \
    -e '/ssl_certificate/d' \
    -e '/include .*letsencrypt/d' \
    -e '/ssl_dhparam/d' \
    -e 's/listen 80;/listen 80 default_server;/' \
    -e '/return 301 https/d' \
    "$NGINX_CONFIG" > /tmp/nginx-http-temp.conf

cp /tmp/nginx-http-temp.conf "$NGINX_CONFIG"

# Verificar configuração HTTP
echo "✅ Validando configuração nginx (HTTP)..."
if ! nginx -t; then
    echo "❌ Configuração nginx HTTP inválida!"
    cat "$NGINX_CONFIG"
    exit 1
fi

# Ativar site HTTP temporário
echo "🔗 Ativando site HTTP temporário..."
ln -sf "$NGINX_CONFIG" "$NGINX_ENABLED"

# Configurar firewall
echo "🔒 Configurando firewall..."
ufw allow 'Nginx Full' >/dev/null 2>&1 || true

# Reiniciar nginx com configuração HTTP
echo "🔄 Reiniciando nginx com HTTP..."
systemctl restart nginx

# Verificar se nginx está funcionando
if ! systemctl is-active --quiet nginx; then
    echo "❌ Nginx não está rodando!"
    systemctl status nginx --no-pager -l || true
    exit 1
fi

echo "✅ Nginx HTTP funcionando"

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

# ETAPA 2: Gerar certificados SSL
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
    
    # ETAPA 3: Aplicar configuração completa com SSL
    echo "🔄 Aplicando configuração completa com SSL..."
    
    # Restaurar configuração original com SSL
    cp nginx.conf "$NGINX_CONFIG"
    sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$NGINX_CONFIG"
    
    # Testar configuração SSL
    if nginx -t; then
        systemctl reload nginx
        echo "✅ Configuração SSL aplicada com sucesso!"
    else
        echo "⚠️ Configuração SSL falhou, mantendo HTTP"
    fi
    
else
    echo "❌ Falha ao gerar certificados SSL"
    echo "   Site funcionando em HTTP: http://$DOMAIN"
    echo "   Verifique se:"
    echo "   1. DNS está configurado corretamente"
    echo "   2. Firewall permite conexões HTTP/HTTPS"
    echo "   3. Domínio está acessível"
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

# Testar renovação automática se SSL está funcionando
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "🧪 Testando renovação automática..."
    if certbot renew --dry-run --quiet; then
        echo "✅ Renovação automática configurada com sucesso!"
    else
        echo "⚠️ Teste de renovação falhou, mas certificados foram gerados"
    fi
fi

# Verificar status final
echo ""
echo "🎉 Configuração Concluída!"
echo "========================="
echo ""
echo "✅ Domínio configurado: $DOMAIN"

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "✅ Certificados SSL gerados"
    echo "✅ Renovação automática ativada"
    echo "✅ HTTPS funcionando"
    PROTOCOL="https"
else
    echo "⚠️ SSL não configurado - usando HTTP"
    PROTOCOL="http"
fi

echo "✅ Nginx configurado e rodando"
echo ""

# Teste final
echo "🔗 Testando conectividade..."
if curl -sSf "$PROTOCOL://$DOMAIN/health" >/dev/null 2>&1; then
    echo "✅ Site funcionando: $PROTOCOL://$DOMAIN"
elif curl -sSf "$PROTOCOL://$DOMAIN" >/dev/null 2>&1; then
    echo "✅ Site funcionando: $PROTOCOL://$DOMAIN"
else
    echo "⚠️ Site pode não estar funcionando ainda"
    echo "   Teste: $PROTOCOL://$DOMAIN"
fi

echo ""
if [ "$PROTOCOL" = "https" ]; then
    echo "📋 Informações importantes:"
    echo "• Certificados renovam automaticamente a cada 60 dias"
    echo "• Logs da renovação: /var/log/certbot-renew.log"  
    echo "• Para forçar renovação: certbot renew --force-renewal"
    echo "• Para verificar status: certbot certificates"
fi

echo ""
echo "🚀 Site online em: $PROTOCOL://$DOMAIN" 