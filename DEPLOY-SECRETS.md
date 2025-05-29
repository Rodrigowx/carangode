# 🔑 Configuração de Secrets para Deploy

Configure estes secrets no GitHub em: **Settings > Secrets and variables > Actions**

## 🖥️ Secrets da VPS

| Secret | Exemplo | Descrição |
|--------|---------|-----------|
| `VPS_HOST` | `192.168.1.100` | IP da sua VPS |
| `VPS_USERNAME` | `ubuntu` | Usuário da VPS |
| `VPS_PASSWORD` | `minhasenha123` | Senha da VPS (alternativa ao SSH key) |
| `VPS_SSH_KEY` | `-----BEGIN RSA PRIVATE KEY-----...` | Chave SSH privada completa |
| `DOMAIN_NAME` | `meusite.com` | Seu domínio (sem www) |

## 🗄️ Secrets do Backend

| Secret | Exemplo | Descrição |
|--------|---------|-----------|
| `DATABASE_URL` | `file:./dev.db` | URL do banco SQLite |
| `JWT_SECRET` | `minha-chave-super-secreta-jwt` | Chave para assinar JWT |
| `ADMIN_USERNAME` | `admin` | Usuário administrador |
| `ADMIN_PASSWORD` | `minhasenhasegura123` | Senha do administrador |

## 🌐 Secrets do Frontend (opcional)

| Secret | Exemplo | Descrição |
|--------|---------|-----------|
| `VITE_API_URL` | `https://meusite.com/api` | URL da API (configurado automaticamente) |

---

## ⚡ Otimizações Implementadas

### 📦 **Node.js 22 LTS** (melhor performance + compatibilidade)
- **Melhor performance** que versões anteriores
- **Totalmente compatível** com React Router 7
- **V8 engine moderna** com recursos ES2024
- **LTS até 2027** - suporte de longo prazo

### 🚀 **Deploy Simplificado** (sem Docker)
- **Node.js direto** na VPS (sem containers)
- **PM2** para gerenciamento de processos
- **Validação prévia** de secrets
- **Fallback HTTP/HTTPS** automático  
- **Logs melhorados** com emojis

### 🔧 **Scripts Otimizados**
- **Rota correta**: `/api/cursos` (não `/api/admin/cursos`)
- **Health checks** funcionais
- **Monitor melhorado** com mais opções

---

## 🚀 Como funciona

1. **Validação** → Verifica secrets obrigatórios primeiro
2. **Node 22 LTS** → Instala versão mais moderna para React Router 7
3. **Deploy direto** → Sem Docker, usando PM2 + Nginx
4. **SSL automático** → Com fallback HTTP se falhar
5. **Monitoramento** → Health checks funcionais

## ✅ Primeira configuração

O deploy vai:
- ✅ Instalar **Node.js 22 LTS** (melhor performance)
- ✅ Configurar **PM2** com limites de memória
- ✅ Configurar **SSL automático** com fallback
- ✅ Validar **saúde dos serviços** corretamente

## 📊 Monitoramento Simplificado

```bash
./monitor.sh         # Status geral
./monitor.sh logs     # Ver logs
./monitor.sh restart  # Reiniciar tudo
./monitor.sh nginx    # Status do Nginx
```

## 🌐 Acessar aplicação

- **Frontend**: `https://meusite.com`
- **API**: `https://meusite.com/api/cursos`

## 🔧 Recursos Otimizados

### ⚡ **Performance**
✅ **Node 22 LTS** (V8 engine moderna)  
✅ **Memory limits** (Backend: 150MB, Frontend: 100M)  
✅ **PM2 cluster mode** disponível  
✅ **Nginx otimizado** com cache  

### 🛡️ **Segurança**
✅ **Validação prévia** de secrets  
✅ **SSL automático** com Let's Encrypt  
✅ **Health checks** funcionais  
✅ **Rate limiting** no Nginx  
✅ **Headers de segurança** configurados  

### 🔧 **Confiabilidade**
✅ **Testes corretos** das rotas  
✅ **Logs estruturados** com emojis  
✅ **Restart automático** do PM2  
✅ **SSL renovação** automática  

---

## 🎯 **Arquitetura Final**

```
Internet → Nginx (80/443) → Backend (5000) + Frontend (3000)
                ↓
           Let's Encrypt SSL
                ↓
            PM2 Process Manager
                ↓
           Node.js 22 + SQLite
```

**Tecnologias**: Node 22 LTS, PM2, Nginx, Let's Encrypt, Ubuntu 24.04  
**Sem Docker**: Deploy direto mais simples e eficiente  

🎉 **Sistema otimizado para produção sem complexidade desnecessária!**

## 🔒 Configuração HTTPS

### 📋 Antes do deploy:

1. **Configure seu domínio** para apontar para o IP da VPS
2. **Atualize o nginx.conf** substituindo `DOMAIN_PLACEHOLDER` (feito automaticamente)

### 🔑 SSL Automático:

O deploy configura SSL automaticamente via Let's Encrypt. Se falhar, usa HTTP temporariamente.

---

## 🚀 Como funciona o Deploy

1. **Push na main** → GitHub Actions inicia
2. **Checkout do código** → Baixa o repositório atual
3. **Deploy na VPS** → Conecta via SSH e configura tudo
4. **Instala Node 22** → Versão melhor para React Router 7
5. **Cria .env automaticamente** → Usando os secrets
6. **Instala dependências** → Backend e frontend
7. **Builda e inicia** → PM2 gerencia os processos
8. **Configura Nginx** → Proxy reverso com HTTPS automático

## ✅ Primeira configuração

Na primeira vez, o deploy vai:
- Instalar Node.js 22 LTS
- Instalar PM2
- Configurar Nginx com HTTPS automático
- Configurar firewall UFW
- Criar todos os arquivos necessários

## 📊 Monitoramento

Acesse sua VPS e use:
```bash
pm2 status          # Status dos serviços
pm2 logs            # Ver logs
pm2 restart all     # Reiniciar tudo
sudo nginx -t       # Testar configuração Nginx
./troubleshoot.sh   # Diagnóstico completo
```

## 🌐 Acessar aplicação

- **Frontend**: `https://meusite.com`
- **API**: `https://meusite.com/api/cursos`
- **HTTP redirects** automaticamente para HTTPS

## 🔧 Vantagens da arquitetura sem Docker:

✅ **Mais simples** → Menos camadas de abstração  
✅ **Deploy mais rápido** → Sem build de containers  
✅ **Menos recursos** → Menor uso de memória  
✅ **Debug mais fácil** → Logs diretos do sistema  
✅ **PM2 nativo** → Melhor performance que containers  
✅ **SSL nativo** → Let's Encrypt integrado