import axios from 'axios';

// Determinar a URL base da API
const getBaseURL = () => {
  // Em desenvolvimento, usar proxy do Vite
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // Em produção, usar variável de ambiente ou fallback
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

// Criar instância do axios
const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação automaticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log para debug em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
apiClient.interceptors.response.use(
  (response) => {
    // Log para debug em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`[API] Response: ${response.status}`, response.data);
    }
    return response;
  },
  (error) => {
    // Log do erro para debug
    if (import.meta.env.DEV) {
      console.error('[API] Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Se o token expirou ou é inválido, redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Só redirecionar se estivermos no browser e na área admin
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient; 