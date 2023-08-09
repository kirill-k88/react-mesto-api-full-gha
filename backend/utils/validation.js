const NotFoundError = require('../errorClasses/NotFoundError');
const ForbiddenError = require('../errorClasses/ForbiddenError');
const BadRequest = require('../errorClasses/BadRequest');
const ConflictError = require('../errorClasses/ConflictError');

module.exports.checkResult = (data) => {
  if (!data) {
    return Promise.reject(
      new NotFoundError('Данных по указанному _id не найдено'),
    );
  }
  return data;
};

module.exports.checkResultFindCard = (data, id) => {
  if (!data) {
    return Promise.reject(
      new NotFoundError('Данных по указанному _id не найдено'),
    );
  }
  if (data.owner._id.toString() !== id) {
    return Promise.reject(
      new ForbiddenError(
        'Карточка по указанному _id принадлежит другому пользователю',
      ),
    );
  }
  return data;
};

module.exports.checkDBValidationError = (err) => {
  if (err.code === 11000) {
    return new ConflictError(
      'Ошибка валидации в БД. Данные с указанными полями уже существуют в БД',
    );
  }

  if (err.name === 'ValidationError') {
    return new BadRequest('Ошибка валидации данных в БД');
  }

  return err;
};
