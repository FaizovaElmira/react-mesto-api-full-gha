const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authMiddleware = (req, res, next) => {
  if (req.url.includes('/signin') || req.url.includes('/signup')) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; // Use JWT_SECRET from environment or default to 'dev-secret'
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // записываем пейлоуд в объект запроса
    next(); // пропускаем запрос дальше
    return null; // explicit return after calling next()
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
};

module.exports = authMiddleware;
