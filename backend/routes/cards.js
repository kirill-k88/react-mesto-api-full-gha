const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string()
        .alphanum()
        .length(24)
        .message('Передан некорректный id'),
    }),
  }),
  deleteCard,
);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .regex(/http.?:\/\/.*\.[a-zA-z]{2,3}/),
    }),
  }),
  createCard,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string()
        .alphanum()
        .length(24)
        .message('Передан некорректный id'),
    }),
  }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string()
        .alphanum()
        .length(24)
        .message('Передан некорректный id'),
    }),
  }),
  dislikeCard,
);

module.exports = router;
