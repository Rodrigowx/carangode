#!/bin/bash

# Script simplificado para configurar SSL rapidamente

set -e

DOMAIN=$1
if [ -z "$DOMAIN" ]; then
    echo "Uso: ./setup-ssl-simple.sh seudominio.com"
    exit 1
fi

echo "🔒 Configuração SSL Simplificada - $DOMAIN"
echo "=========================================="

# Parar nginx
echo "⏸️ Parando nginx temporariamente..."
systemctl stop nginx

# Gerar certificado standalone (sem nginx)
echo "🔐 Gerando certificados SSL..."
certbot certonly \
    --standalone \
    --domains "$DOMAIN,www.$DOMAIN" \
    --email "admin@$DOMAIN" \
    --agree-tos \
    --no-eff-email \
    --non-interactive

if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "✅ Certificados gerados!"
    
    # Configurar nginx com SSL
    echo "🔄 Configurando nginx com SSL..."
    cd ~/carangode
    
    # Limpar e reconfigurar
    rm -f /etc/nginx/sites-enabled/carangode
    cp nginx.conf /etc/nginx/sites-available/carangode
    sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" /etc/nginx/sites-available/carangode
    ln -sf /etc/nginx/sites-available/carangode /etc/nginx/sites-enabled/
    
    # Testar e iniciar nginx
    if nginx -t; then
        systemctl start nginx
        echo "✅ SSL configurado com sucesso!"
        echo "🌐 Site: https://$DOMAIN"
    else
        echo "❌ Erro na configuração nginx"
        exit 1
    fi
else
    echo "❌ Falha ao gerar certificados"
    systemctl start nginx  # Restaurar nginx
    exit 1
fi 