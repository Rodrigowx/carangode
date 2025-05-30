# 🚀 Workflows do GitHub Actions

Este projeto possui workflows para deploy e criação de releases. **Todos os deploys são MANUAIS** - você decide quando fazer o deploy.

## 📦 Deploy Manual

### 🎯 Como Funciona
- **Todos os deploys são manuais** - nenhum deploy automático
- Você tem controle total sobre quando fazer deploy
- Commits não acionam deploys automaticamente

### 🚀 Como Fazer Deploy
1. Vá para **Actions** → **Deploy para VPS**
2. Clique em **Run workflow**
3. Configure as opções:
   - **Ambiente**: `production` ou `staging`
   - **Forçar SSL**: Se quiser reconfigurar SSL
   - **Tag de versão**: Versão customizada (opcional)
   - **Debug SSH**: Para diagnosticar problemas
   - **Criar release**: Se quer criar release após deploy

### Opções do Deploy Manual:
```yaml
Ambiente para deploy: 
  - production (padrão)
  - staging

Forçar reconfiguração SSL:
  - false (padrão)
  - true

Tag de versão:
  - Deixe vazio para auto-gerar: v2024.01.15-a1b2c3d
  - Ou especifique: v1.2.3

Debug SSH:
  - false (padrão)
  - true (para diagnosticar problemas)

Criar release após deploy:
  - true (padrão) - cria release automaticamente
  - false - apenas faz deploy
```

## 🏷️ Criação de Releases

### Release via Deploy
- Opção **"Criar release após deploy"** no workflow de deploy
- Inclui informações do deploy manual
- Vinculado à versão deployada

### Release Manual Independente
1. Vá para **Actions** → **Criar Release Manual**
2. Clique em **Run workflow**
3. Configure:

```yaml
Versão do release:
  - Formato: v1.2.3 ou 1.2.3
  - Exemplo: v2.1.0

Tipo do release:
  - major: Mudanças que quebram compatibilidade
  - minor: Novas funcionalidades (padrão)
  - patch: Correções de bugs
  - hotfix: Correções urgentes

É um pre-release?:
  - false: Release estável (padrão)
  - true: Pre-release (teste)

Gerar changelog automático?:
  - true: Gera changelog dos commits (padrão)
  - false: Release simples
```

## 🔄 Fluxo Recomendado

### Para desenvolvimento normal:
1. **Commit** suas alterações na branch `main`
2. **Quando estiver pronto**, execute **Deploy Manual**
3. **Opcionalmente** crie release automático junto com deploy

### Para releases importantes:
1. **Termine** suas alterações
2. **Crie um release manual** com versão específica
3. **Execute deploy manual** com a mesma versão

### Para correções urgentes:
1. **Commit** a correção
2. **Deploy manual imediato**
3. **Crie release** tipo "hotfix" se necessário

### Para testar mudanças:
1. **Execute deploy** com **ambiente = staging**
2. **Teste** no ambiente de staging
3. **Deploy em production** quando aprovado

## 📊 Informações dos Releases

Cada release inclui:
- 📅 **Data e hora** da criação
- 👤 **Quem executou** o deploy/release
- 🔧 **Hash do commit**
- 📋 **Lista de commits** (se changelog automático)
- 🔗 **Links** para site ao vivo e API
- 📊 **Informações** do deploy manual

## 🛠️ Funcionalidades Adicionais

### Versionamento
- **Auto-gerado**: `v2024.01.15-a1b2c3d` (data + hash)
- **Manual**: `v1.2.3` (semantic versioning)

### Ambientes
- **Production**: Ambiente principal
- **Staging**: Ambiente de teste

### SSL
- **Automático**: Configura SSL quando necessário
- **Forçado**: Reconfigura SSL mesmo se já existe

### Controle Total
- **Você decide** quando fazer deploy
- **Commits não disparam** deploys automáticos
- **Flexibilidade** para testar antes de subir

## 🚨 Troubleshooting

### Deploy falhou:
1. Verifique os logs no Actions
2. Confirme se todos os secrets estão configurados
3. Execute com **Debug SSH** = true

### SSH não conecta:
1. Execute deploy com **Debug SSH** = true
2. Verifique VPS_HOST, VPS_USERNAME
3. Configure VPS_SSH_KEY ou VPS_PASSWORD
4. Consulte: `.github/SSH_TROUBLESHOOTING.md`

### Quero reverter deploy:
1. Execute deploy manual com versão anterior
2. Ou use tag de release anterior
3. Monitore logs para confirmar sucesso

## 🎯 Vantagens do Deploy Manual

### ✅ **Controle Total**
- Você decide quando fazer deploy
- Não há surpresas com deploys automáticos
- Pode testar antes de subir para produção

### ✅ **Flexibilidade**
- Deploy em ambiente staging primeiro
- Controle de versões específicas
- Opções de debug quando necessário

### ✅ **Segurança**
- Validação antes do deploy
- Verificação de secrets
- Logs detalhados de cada ação

## 🔐 Secrets Necessários

Certifique-se de que estes secrets estão configurados:
- `VPS_HOST`: IP do servidor
- `VPS_USERNAME`: Usuário SSH
- `VPS_PASSWORD`: Senha SSH (ou use VPS_SSH_KEY)
- `VPS_SSH_KEY`: Chave SSH privada (alternativa à senha)
- `DOMAIN_NAME`: Seu domínio
- `DATABASE_URL`: URL do banco de dados
- `JWT_SECRET`: Chave secreta JWT
- `ADMIN_USERNAME`: Usuário admin
- `ADMIN_PASSWORD`: Senha admin

---

## 🚀 Como Começar

1. **Configure os secrets** em Settings → Secrets and variables → Actions
2. **Faça seus commits** normalmente
3. **Quando estiver pronto**, vá em **Actions** → **Deploy para VPS**
4. **Execute deploy manual** com as opções desejadas
5. **Monitore os logs** para confirmar sucesso

**Agora você tem controle total sobre seus deploys!** 🎯 