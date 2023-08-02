const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { errors } = require('celebrate');
const cors = require('cors');
const handleErrors = require('./errors/handleErrors');
const NotFoundError = require('./errors/NotFoundError');
const routes = require('./routes');
const auth = require('./middlewares/auth');

const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Защитные middleware

app.use(helmet()); // Добавляем Helmet middleware

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 минут
  max: 100, // максимальное количество запросов
});
app.use(limiter); // Добавляем ограничитель запросов

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Middleware для установки заголовка Content-Type для всех ответов в формате JSON
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(auth);
app.use(requestLogger); // подключаем логгер запросов
app.use(routes);

// Обработчик для неправильного пути, возвращающий JSON-ответ с кодом 404
app.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleErrors); // централизованный обработчик ошибок

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
