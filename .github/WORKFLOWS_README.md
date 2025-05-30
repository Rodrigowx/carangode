# 🚀 Workflows do GitHub Actions

Este projeto possui workflows automatizados para deploy e criação de releases. Aqui está como usar cada um:

## 📦 Deploy Automático e Manual

### Deploy Automático
- **Trigger**: Push na branch `main`
- **Comportamento**: 
  - Executa deploy automaticamente
  - Cria release automático com versionamento baseado na data
  - Formato da versão: `v2024.01.15-a1b2c3d`

### Deploy Manual
1. Vá para **Actions** → **Deploy para VPS**
2. Clique em **Run workflow**
3. Configure as opções:
   - **Ambiente**: `production` ou `staging`
   - **Forçar SSL**: Se quiser reconfigurar SSL
   - **Tag de versão**: Versão customizada (opcional)

### Opções do Deploy Manual:
```yaml
Ambiente para deploy: 
  - production (padrão)
  - staging

Forçar reconfiguração SSL:
  - false (padrão)
  - true

Tag de versão:
  - Deixe vazio para auto-gerar
  - Ou especifique: v1.2.3
```

## 🏷️ Criação de Releases

### Release Automático
- Criado automaticamente em cada push para `main`
- Inclui informações do commit e links úteis
- Versionamento automático baseado na data

### Release Manual
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
2. O **deploy automático** será executado
3. Um **release automático** será criado

### Para releases importantes:
1. **Termine** suas alterações
2. **Crie um release manual** com versão específica
3. **Execute deploy manual** se necessário

### Para correções urgentes:
1. **Commit** a correção
2. **Crie release manual** tipo "hotfix"
3. **Deploy manual** se necessário

## 📊 Informações dos Releases

Cada release inclui:
- 📅 **Data e hora** da criação
- 👤 **Autor** que criou
- 🔧 **Hash do commit**
- 📋 **Lista de commits** (se changelog automático)
- 🔗 **Links** para site ao vivo e API
- 📊 **Estatísticas** de commits

## 🛠️ Funcionalidades Adicionais

### Versionamento
- **Automático**: `v2024.01.15-a1b2c3d` (data + hash)
- **Manual**: `v1.2.3` (semantic versioning)

### Ambientes
- **Production**: Ambiente principal
- **Staging**: Ambiente de teste (futuro)

### SSL
- **Automático**: Configura SSL quando necessário
- **Forçado**: Reconfigura SSL mesmo se já existe

### Comentários
- **Deploy manual**: Comenta no commit com detalhes
- **Release manual**: Comenta no commit com link

## 🚨 Troubleshooting

### Deploy falhou:
1. Verifique os logs no Actions
2. Confirme se todos os secrets estão configurados
3. Execute deploy manual com opções específicas

### Release não apareceu:
1. Verifique se o workflow terminou com sucesso
2. Vá na aba "Releases" do repositório
3. Para pre-releases, marque "Include pre-releases"

### SSL não funciona:
1. Execute deploy manual com "Forçar SSL" = true
2. Verifique se o domínio está apontando para o servidor
3. Aguarde alguns minutos para propagação DNS

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