#!/bin/bash

# Script de diagnóstico SSL/HTTPS para erro 522 Cloudflare

echo "🔒 Diagnóstico SSL/HTTPS - Erro 522 Cloudflare"
echo "================================================"
echo ""

# Verificar se temos o domínio definido
echo "📝 Configuração de Domínio:"
DOMAIN_IN_NGINX=$(grep -oP 'server_name \K[^;]*' /etc/nginx/sites-available/carangode 2>/dev/null | head -1 | awk '{print $1}')
if [ -z "$DOMAIN_IN_NGINX" ] || [ "$DOMAIN_IN_NGINX" = "DOMAIN_PLACEHOLDER" ]; then
    echo "❌ PROBLEMA CRÍTICO: Domínio não configurado no nginx!"
    echo "   - Arquivo: /etc/nginx/sites-available/carangode"
    echo "   - Ainda contém DOMAIN_PLACEHOLDER"
    echo ""
    echo "🔧 SOLUÇÃO: Substitua DOMAIN_PLACEHOLDER pelo seu domínio real"
    echo "   sudo sed -i 's/DOMAIN_PLACEHOLDER/seudominio.com/g' /etc/nginx/sites-available/carangode"
    echo ""
    DOMAIN_FOUND=false
else
    echo "✅ Domínio configurado: $DOMAIN_IN_NGINX"
    DOMAIN_FOUND=true
fi
echo ""

# Verificar certificados SSL
echo "🔐 Certificados SSL:"
if [ "$DOMAIN_FOUND" = true ]; then
    CERT_PATH="/etc/letsencrypt/live/$DOMAIN_IN_NGINX"
    if [ -d "$CERT_PATH" ]; then
        echo "✅ Diretório de certificados existe: $CERT_PATH"
        
        if [ -f "$CERT_PATH/fullchain.pem" ] && [ -f "$CERT_PATH/privkey.pem" ]; then
            echo "✅ Arquivos de certificado encontrados"
            
            # Verificar validade do certificado
            EXPIRE_DATE=$(openssl x509 -in "$CERT_PATH/fullchain.pem" -noout -enddate 2>/dev/null | cut -d= -f2)
            if [ ! -z "$EXPIRE_DATE" ]; then
                echo "✅ Certificado válido até: $EXPIRE_DATE"
                
                # Verificar se vai expirar em breve (30 dias)
                EXPIRE_TIMESTAMP=$(date -d "$EXPIRE_DATE" +%s 2>/dev/null)
                CURRENT_TIMESTAMP=$(date +%s)
                DAYS_LEFT=$(( ($EXPIRE_TIMESTAMP - $CURRENT_TIMESTAMP) / 86400 ))
                
                if [ $DAYS_LEFT -lt 30 ]; then
                    echo "⚠️ ATENÇÃO: Certificado expira em $DAYS_LEFT dias"
                else
                    echo "✅ Certificado válido por $DAYS_LEFT dias"
                fi
            else
                echo "❌ Erro ao ler certificado"
            fi
        else
            echo "❌ Arquivos de certificado não encontrados"
        fi
    else
        echo "❌ Certificados SSL não encontrados em $CERT_PATH"
        echo "🔧 Execute: sudo certbot --nginx -d $DOMAIN_IN_NGINX"
    fi
else
    echo "❌ Não é possível verificar certificados sem domínio configurado"
fi
echo ""

# Verificar se nginx está escutando nas portas corretas
echo "🔌 Portas e Binddings:"
echo "HTTP (80):"
ss -tlnp | grep :80 || echo "❌ Nginx não está escutando na porta 80"

echo "HTTPS (443):"
ss -tlnp | grep :443 || echo "❌ Nginx não está escutando na porta 443"

echo "Backend (5000):"
ss -tlnp | grep :5000 || echo "❌ Backend não está rodando na porta 5000"

echo "Frontend (3000):"
ss -tlnp | grep :3000 || echo "❌ Frontend não está rodando na porta 3000"
echo ""

# Verificar configuração nginx
echo "🌐 Nginx:"
if sudo nginx -t &>/dev/null; then
    echo "✅ Configuração nginx válida"
else
    echo "❌ PROBLEMA: Configuração nginx inválida"
    echo "Erros:"
    sudo nginx -t
fi

# Status do nginx
NGINX_STATUS=$(sudo systemctl is-active nginx 2>/dev/null)
echo "Status nginx: $NGINX_STATUS"
if [ "$NGINX_STATUS" != "active" ]; then
    echo "❌ Nginx não está rodando"
    echo "🔧 Execute: sudo systemctl start nginx"
fi
echo ""

# Verificar firewall UFW
echo "🔒 Firewall:"
UFW_STATUS=$(sudo ufw status 2>/dev/null)
echo "$UFW_STATUS"

if echo "$UFW_STATUS" | grep -q "inactive"; then
    echo "⚠️ UFW inativo - isso pode estar OK se usando Cloudflare"
elif ! echo "$UFW_STATUS" | grep -q "Nginx Full\|80\|443"; then
    echo "❌ Portas HTTP/HTTPS não liberadas no firewall"
    echo "🔧 Execute: sudo ufw allow 'Nginx Full'"
fi
echo ""

# Testes de conectividade local
echo "🔗 Testes de Conectividade Local:"

# Teste HTTP local
if curl -s -o /dev/null -w "%{http_code}" http://localhost > /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
    echo "✅ HTTP local: $HTTP_CODE"
else
    echo "❌ HTTP local falhou"
fi

# Teste backend direto
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/cursos > /dev/null; then
    BACKEND_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/cursos)
    echo "✅ Backend direto: $BACKEND_CODE"
else
    echo "❌ Backend não responde em http://localhost:5000/api/cursos"
fi

# Teste frontend direto  
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 > /dev/null; then
    FRONTEND_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
    echo "✅ Frontend direto: $FRONTEND_CODE"
else
    echo "❌ Frontend não responde em http://localhost:3000"
fi
echo ""

# Verificar logs de erro
echo "📋 Logs de Erro Recentes:"
echo "--- Nginx Error Log (últimas 10 linhas) ---"
sudo tail -10 /var/log/nginx/error.log 2>/dev/null || echo "Log não encontrado"
echo ""

echo "--- PM2 Logs ---"
pm2 logs --lines 5 --nostream 2>/dev/null || echo "PM2 não rodando"
echo ""

# Diagnóstico específico para Cloudflare
echo "☁️ Cloudflare - Causas Comuns do Erro 522:"
echo "1. ❌ Servidor não responde na porta 443 (HTTPS)"
echo "2. ❌ Certificado SSL inválido ou expirado"
echo "3. ❌ Firewall bloqueando conexões do Cloudflare"
echo "4. ❌ Nginx não rodando ou configuração incorreta"
echo "5. ❌ Backend/Frontend não rodando"
echo ""

echo "🔧 Passos para Resolver o Erro 522:"
echo "1. Verificar se seu domínio está correto no nginx.conf"
echo "2. Certificar que nginx está rodando: sudo systemctl start nginx"
echo "3. Gerar certificado SSL: sudo certbot --nginx -d seudominio.com"
echo "4. Liberar firewall: sudo ufw allow 'Nginx Full'"
echo "5. Iniciar aplicações: ./monitor.sh restart"
echo "6. Verificar DNS no Cloudflare (A record apontando para seu IP)"
echo ""

echo "🌐 Teste Manual de HTTPS:"
if [ "$DOMAIN_FOUND" = true ] && [ "$DOMAIN_IN_NGINX" != "DOMAIN_PLACEHOLDER" ]; then
    echo "Execute: curl -I https://$DOMAIN_IN_NGINX"
    echo "Esperado: HTTP/1.1 200 OK ou 301/302"
else
    echo "Configure seu domínio primeiro no nginx.conf"
fi 