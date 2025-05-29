const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  console.log('[AUTH] Tentativa de login recebida');
  console.log('[AUTH] Body recebido:', req.body);
  
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  console.log('[AUTH] Credenciais esperadas:', { adminUsername, adminPassword });
  console.log('[AUTH] Credenciais recebidas:', { username, password });
  
  if (!adminUsername || !adminPassword) {
    console.log('[AUTH] ERRO: Variáveis de ambiente não configuradas');
    return res.status(500).json({ error: 'Servidor não configurado corretamente' });
  }

  if (username !== adminUsername || password !== adminPassword) {
    console.log('[AUTH] ERRO: Credenciais inválidas');
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  console.log('[AUTH] Login bem-sucedido');
  const token = jwt.sign({ username: adminUsername, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};