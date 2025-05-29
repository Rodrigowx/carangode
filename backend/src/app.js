const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();

// Configuração dinâmica do CORS baseada no ambiente
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    process.env.DOMAIN_NAME ? `https://${process.env.DOMAIN_NAME}` : null,
    process.env.DOMAIN_NAME ? `https://www.${process.env.DOMAIN_NAME}` : null
].filter(Boolean); // Remove valores null/undefined

app.use(cors({
    origin: function (origin, callback) {
        // Permitir requisições sem origin (aplicações mobile, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Em desenvolvimento, permitir localhost
        if (process.env.NODE_ENV !== 'production') {
            if (origin.includes('localhost')) return callback(null, true);
        }
        
        // Verificar se origin está na lista de permitidos
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`[CORS] Origin não permitida: ${origin}`);
            console.warn(`[CORS] Origins permitidas:`, allowedOrigins);
            callback(new Error('Não permitido pelo CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200 // Para suporte a navegadores legados
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de segurança para logs em produção
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip}`);
        next();
    });
}

// Middleware de segurança adicional
app.use((req, res, next) => {
    // Headers de segurança
    res.setHeader('X-Powered-By', 'Carangode API');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Rate limiting básico por IP
    req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Routes principais
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message);
    
    if (err.message === 'Não permitido pelo CORS') {
        return res.status(403).json({ error: 'Acesso negado - CORS' });
    }
    
    res.status(500).json({ 
        error: process.env.NODE_ENV === 'production' 
            ? 'Erro interno do servidor' 
            : err.message 
    });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

module.exports = app;