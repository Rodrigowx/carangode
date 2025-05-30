# 🔧 Guia de Troubleshooting SSH

Este guia ajuda a resolver problemas de conexão SSH nos workflows do GitHub Actions.

## ❌ Erro Atual
```
ssh.ParsePrivateKey: ssh: no key found
ssh: handshake failed: ssh: unable to authenticate, attempted methods [none password], no supported methods remain
```

## 🔍 Diagnóstico Rápido

### 1. Verificar Secrets Configurados
Vá em: **Settings** → **Secrets and variables** → **Actions**

**Secrets obrigatórios:**
- `VPS_HOST` - IP do seu servidor (ex: `123.456.789.0`)
- `VPS_USERNAME` - Usuário SSH (ex: `ubuntu`, `root`)
- `VPS_PASSWORD` **OU** `VPS_SSH_KEY` (pelo menos um)
- `DOMAIN_NAME` - Seu domínio
- `DATABASE_URL` - String de conexão do banco
- `JWT_SECRET` - Chave JWT
- `ADMIN_USERNAME` - Usuário admin
- `ADMIN_PASSWORD` - Senha admin

### 2. Testar SSH Localmente
Teste a conexão do seu computador:
```bash
# Com senha
ssh usuario@ip-do-servidor

# Com chave SSH
ssh -i caminho/para/chave.pem usuario@ip-do-servidor
```

## 🔑 Soluções por Método de Autenticação

### Opção A: Usando Senha (Mais Simples)
1. **Configure os secrets:**
   - `VPS_HOST`: IP do servidor
   - `VPS_USERNAME`: usuário SSH
   - `VPS_PASSWORD`: senha do usuário
   
2. **Remova o secret** `VPS_SSH_KEY` se existir

3. **Teste:** Execute workflow com "Debug SSH" = true

### Opção B: Usando Chave SSH (Recomendado)
1. **Gere uma nova chave SSH:**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   ```
   
2. **Copie a chave pública para o servidor:**
   ```bash
   ssh-copy-id -i ~/.ssh/id_rsa.pub usuario@ip-do-servidor
   ```
   
3. **Configure os secrets:**
   - `VPS_HOST`: IP do servidor
   - `VPS_USERNAME`: usuário SSH
   - `VPS_SSH_KEY`: conteúdo completo da chave privada (incluindo `-----BEGIN...` e `-----END...`)
   
4. **Remova o secret** `VPS_PASSWORD` se existir

## 📋 Checklist de Verificação

### ✅ Secrets
- [ ] `VPS_HOST` tem o IP correto
- [ ] `VPS_USERNAME` é um usuário válido no servidor
- [ ] `VPS_PASSWORD` ou `VPS_SSH_KEY` está configurado
- [ ] `DOMAIN_NAME` tem seu domínio
- [ ] Outros secrets estão configurados

### ✅ Servidor
- [ ] SSH está rodando na porta 22
- [ ] Usuário existe no servidor
- [ ] Usuário tem permissões sudo
- [ ] Firewall permite conexões SSH

### ✅ Chave SSH (se usando)
- [ ] Chave privada está completa (com headers/footers)
- [ ] Chave pública está no `~/.ssh/authorized_keys` do servidor
- [ ] Permissões corretas no servidor:
  ```bash
  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/authorized_keys
  ```

## 🛠️ Comandos Úteis no Servidor

### Verificar SSH
```bash
# Status do SSH
sudo systemctl status ssh

# Logs do SSH
sudo tail -f /var/log/auth.log

# Testar configuração
sudo sshd -T
```

### Configurar Chave SSH
```bash
# Criar diretório SSH
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Adicionar chave pública
echo "sua-chave-publica-aqui" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Verificar conteúdo
cat ~/.ssh/authorized_keys
```

## 🐛 Debug Avançado

### 1. Ativar Debug no Workflow
Execute o workflow com:
- **Debug SSH** = `true`

### 2. Verificar Logs Detalhados
O debug mostrará:
- Tentativas de autenticação
- Métodos disponíveis
- Erros específicos

### 3. Testar Diferentes Configurações
```yaml
# Apenas senha
VPS_PASSWORD: "sua-senha"
VPS_SSH_KEY: (remover)

# Apenas chave SSH
VPS_SSH_KEY: "-----BEGIN RSA PRIVATE KEY-----\n..."
VPS_PASSWORD: (remover)
```

## 🔄 Fluxo de Correção

### Passo 1: Identificar o Problema
1. Execute workflow com debug ativado
2. Verifique qual autenticação está sendo tentada
3. Confirme se secrets estão configurados

### Passo 2: Escolher Método
- **Senha**: Mais simples, menos seguro
- **SSH Key**: Mais seguro, recomendado

### Passo 3: Configurar Corretamente
1. Configure secrets necessários
2. Remova secrets desnecessários
3. Teste conexão local primeiro

### Passo 4: Testar
1. Execute workflow manual
2. Ative debug se necessário
3. Verifique logs detalhados

## 🚨 Problemas Comuns

### "ssh: no key found"
- `VPS_SSH_KEY` não está configurado
- Chave SSH está malformada
- **Solução:** Configure senha ou corrija chave SSH

### "unable to authenticate"
- Senha incorreta
- Chave SSH não autorizada no servidor
- **Solução:** Verifique credenciais

### "connection refused"
- SSH não está rodando
- Firewall bloqueando
- **Solução:** Configure servidor SSH

### "permission denied"
- Usuário não existe
- Senha/chave incorreta
- **Solução:** Verifique usuário e credenciais

## 📞 Suporte Adicional

Se ainda tiver problemas:
1. Ative debug SSH no workflow
2. Copie os logs completos
3. Verifique se consegue conectar manualmente
4. Confirme todos os secrets estão corretos

## 🎯 Configuração Recomendada

Para melhor segurança e confiabilidade:
1. Use chave SSH (não senha)
2. Crie usuário específico para deploy
3. Configure sudo sem senha para o usuário
4. Use fail2ban para proteger SSH
5. Mantenha servidor atualizado 