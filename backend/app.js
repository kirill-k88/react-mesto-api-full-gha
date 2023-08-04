const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
  SERVER_PORT = 3000,
  MONGODB_CONNECTION = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const { celebrate, Joi, errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .message('Передано некорректное значение email'),
      password: Joi.string()
        .required()
        .min(7)
        .message('Передан некорректный пароль'),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(7),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/http.?:\/\/.*\.[a-zA-z]{2,3}/),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Был запрошен несуществующий роут'));
});

app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`Ошибка подписки на порт. Ошибка:${err}`);
  }
  console.log('Подключились к порту: ', SERVER_PORT);
});
