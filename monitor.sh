#!/bin/bash

# Monitor simples e funcional do Carangode

check_health() {
  echo "🔍 Verificando saúde dos serviços..."
  echo ""
  
  # Backend
  if curl -sf http://localhost:5000/api/admin/cursos > /dev/null 2>&1; then
    echo "✅ Backend (API): Online"
  else
    echo "❌ Backend (API): Offline"
  fi
  
  # Frontend  
  if curl -sf http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend: Online"
  else
    echo "❌ Frontend: Offline"
  fi
  
  # Nginx
  if sudo systemctl is-active --quiet nginx; then
    echo "✅ Nginx: Ativo"
  else
    echo "❌ Nginx: Inativo"
  fi
  
  echo ""
  echo "📊 PM2 Status:"
  pm2 status
}

case "$1" in
  "status"|"")
    check_health
    ;;
    
  "logs")
    echo "📋 Logs recentes:"
    echo ""
    echo "=== Backend ==="
    pm2 logs backend --lines 15 --nostream
    echo ""
    echo "=== Frontend ==="
    pm2 logs frontend --lines 15 --nostream
    ;;
    
  "restart")
    echo "🔄 Reiniciando serviços..."
    pm2 restart all
    sudo systemctl reload nginx
    echo ""
    echo "✅ Serviços reiniciados!"
    sleep 2
    check_health
    ;;
    
  "nginx")
    echo "🌐 Status do Nginx:"
    sudo systemctl status nginx --no-pager
    echo ""
    echo "📝 Teste de configuração:"
    sudo nginx -t
    ;;
    
  *)
    echo "🚀 Monitor Carangode"
    echo ""
    echo "Comandos:"
    echo "  $0 status   - Status geral (padrão)"
    echo "  $0 logs     - Ver logs recentes"
    echo "  $0 restart  - Reiniciar serviços"
    echo "  $0 nginx    - Status detalhado do Nginx"
    ;;
esac 