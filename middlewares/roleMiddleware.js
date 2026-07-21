function roleMiddleware(rolesPermitidas) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario nao autenticado.' });
    }

    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ error: 'Voce nao tem permissao para fazer isso.' });
    }

    return next();
  };
}

module.exports = roleMiddleware;
