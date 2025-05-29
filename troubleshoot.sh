#!/bin/bash

# Script de troubleshooting para Carangode

echo "🔧 Carangode Troubleshooting"
echo "============================"
echo ""

# Verificar sistema
echo "📊 Informações do Sistema:"
echo "OS: $(uname -a)"
echo "User: $(whoami)"
echo "Working Dir: $(pwd)"
echo ""

# Verificar Node.js
echo "📦 Node.js:"
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  echo "✅ Node version: $NODE_VERSION"
  echo "✅ NPM version: $(npm --version)"
  
  # Verificar se é Node 22+ (recomendado para React Router 7)
  if [[ $NODE_VERSION =~ v([0-9]+) ]] && [ "${BASH_REMATCH[1]}" -lt 22 ]; then
    echo "⚠️ Node ${BASH_REMATCH[1]} detectado. Node 22+ recomendado para melhor performance"
  fi
else
  echo "❌ Node.js não está instalado"
fi
echo ""

# Verificar PM2
echo "🔄 PM2:"
if command -v pm2 &> /dev/null; then
  echo "✅ PM2 instalado"
  echo "📊 Status PM2:"
  pm2 status
else
  echo "❌ PM2 não está instalado"
fi
echo ""

# Verificar Nginx
echo "🌐 Nginx:"
if command -v nginx &> /dev/null; then
  echo "✅ Nginx instalado"
  echo "Status: $(sudo systemctl is-active nginx || echo 'inativo')"
  echo "📝 Teste de configuração:"
  sudo nginx -t 2>&1 || echo "❌ Configuração inválida"
else
  echo "❌ Nginx não está instalado"
fi
echo ""

# Verificar firewall
echo "🔒 Firewall (UFW):"
sudo ufw status
echo ""

# Verificar portas
echo "🔌 Portas em uso:"
echo "Porta 5000 (Backend): $(ss -tlnp | grep :5000 || echo 'não ocupada')"
echo "Porta 3000 (Frontend): $(ss -tlnp | grep :3000 || echo 'não ocupada')"
echo "Porta 80 (HTTP): $(ss -tlnp | grep :80 || echo 'não ocupada')"
echo "Porta 443 (HTTPS): $(ss -tlnp | grep :443 || echo 'não ocupada')"
echo ""

# Verificar arquivos importantes
echo "📁 Arquivos importantes:"
[ -f ~/carangode/.git/config ] && echo "✅ Repositório configurado" || echo "❌ Repositório não configurado"
[ -f ~/carangode/nginx.conf ] && echo "✅ nginx.conf existe" || echo "❌ nginx.conf não encontrado"
[ -f ~/carangode/backend/.env ] && echo "✅ backend/.env existe" || echo "❌ backend/.env não encontrado"
[ -f ~/carangode/frontend/.env ] && echo "✅ frontend/.env existe" || echo "❌ frontend/.env não encontrado"
echo ""

# Verificar conectividade
echo "🌐 Testes de conectividade:"

# Teste backend
if curl -sf http://localhost:5000/health > /dev/null 2>&1; then
  echo "✅ Backend health check OK"
elif curl -sf http://localhost:5000/api/cursos > /dev/null 2>&1; then
  echo "✅ Backend API OK"
else
  echo "❌ Backend não responde"
  echo "   Logs do backend (últimas 5 linhas):"
  pm2 logs backend --lines 5 --nostream 2>/dev/null || echo "   PM2 não rodando"
fi

# Teste frontend
if curl -sf http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ Frontend OK"
else
  echo "❌ Frontend não responde"
  echo "   Logs do frontend (últimas 5 linhas):"
  pm2 logs frontend --lines 5 --nostream 2>/dev/null || echo "   PM2 não rodando"
fi
echo ""

# Verificar SSL
echo "🔒 SSL/HTTPS:"
if [ -f "/etc/letsencrypt/live/*/fullchain.pem" ]; then
  echo "✅ Certificados SSL encontrados"
  echo "Certificados:"
  ls -la /etc/letsencrypt/live/
else
  echo "❌ Nenhum certificado SSL encontrado"
fi
echo ""

# Verificar logs de erro
echo "📋 Logs de erro recentes:"
echo "--- Nginx Error Log ---"
sudo tail -5 /var/log/nginx/error.log 2>/dev/null || echo "Log não encontrado"
echo ""

# Comandos úteis para debug
echo "🛠️ Comandos úteis para debug:"
echo "pm2 logs backend --lines 50    # Ver logs do backend"
echo "pm2 logs frontend --lines 50   # Ver logs do frontend"  
echo "sudo nginx -t                  # Testar config nginx"
echo "sudo systemctl status nginx    # Status do nginx"
echo "sudo ufw status verbose        # Status detalhado firewall"
echo "curl -v http://localhost:5000/api/cursos  # Testar API"
echo "curl -v http://localhost:3000             # Testar frontend"
echo ""

echo "🚀 Para resolver problemas comuns:"
echo "./monitor.sh restart           # Reiniciar serviços"
echo "sudo systemctl restart nginx   # Reiniciar nginx"
echo "sudo ufw allow 'Nginx Full'    # Liberar firewall" 