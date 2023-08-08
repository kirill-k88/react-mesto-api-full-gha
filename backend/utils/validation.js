const NotFoundError = require('../errorClasses/NotFoundError');
const ForbiddenError = require('../errorClasses/ForbiddenError');

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
