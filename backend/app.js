const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const {
  SERVER_PORT = 3000,
  MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const {
  bodySigninValidator,
  bodySignupValidator,
} = require('./middlewares/celebrateValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');
const preflight = require('./middlewares/preflight');

const NotFoundError = require('./errorClasses/NotFoundError');

mongoose
  .connect(MONGODB_CONNECTION, {})
  .then(() => {
    console.log('Подключился к MongoDB:', MONGODB_CONNECTION);
  })
  .catch((err) => {
    console.log(`Не удалось подключиться к MongoDB. Ошибка:${err}`);
  });

const app = express();

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);
app.use(preflight);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', bodySigninValidator, login);
app.post('/signup', bodySignupValidator, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Ошибка подписки на порт. Ошибка:${err}`);
  }
  console.log('Подключились к порту: ', SERVER_PORT);
});
