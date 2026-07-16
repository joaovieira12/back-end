const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const partes = authHeader.split(' ');
  const tipo = partes[0];
  const token = partes[1];

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token mal formatado.' });
  }

  try {
    const dadosUsuario = verifyToken(token);
    req.user = dadosUsuario;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}

module.exports = authMiddleware;
