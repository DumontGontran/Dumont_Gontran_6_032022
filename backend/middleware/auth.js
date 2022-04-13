const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw res.status(401).json({ message: 'user ID invalide !' });
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: 'Requête invalide !' });
  }
};