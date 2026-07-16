function roleMiddleware(rolesPermitidas) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ error: 'Você não tem permissão para fazer isso.' });
    }

    return next();
  };
}

module.exports = roleMiddleware;
