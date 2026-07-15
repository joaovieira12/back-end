const { verifyToken } = require('../utils/jwt');

// Verifica se o header Authorization tem um token JWT válido.
// Se válido, coloca os dados do usuário em req.user e segue para a rota.
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido. Use: Bearer <token>' });
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
