
const authMiddleware = (req, res, next) => {
  if (!req.session.sessionId) {
    return res.status(401).send('Unauthorized: Please log in');
  }
  next();
};

module.exports = authMiddleware;
