# Usar Node 18 Alpine (mais leve que 22)
FROM node:18-alpine

# Instalar dependências do sistema necessárias para Prisma/SQLite
RUN apk add --no-cache openssl sqlite

WORKDIR /app

# Copiar arquivos de dependências primeiro (cache layer)
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependências
RUN npm ci --production --silent && npm cache clean --force

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código da aplicação
COPY . .

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Configurar permissões
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expor porta
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando de início
CMD ["node", "src/server.js"] 