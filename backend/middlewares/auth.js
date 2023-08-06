const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  if (req.url.includes('/signin') || req.url.includes('/signup')) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', ''); // Extract the token from the header

  try {
    const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
    return null;
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации: не получилось верифицировать токен'));
  }
};

module.exports = authMiddleware;
