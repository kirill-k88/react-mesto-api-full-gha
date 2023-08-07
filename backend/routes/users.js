const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/http.?:\/\/.*\.[a-zA-z]{2,3}/),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(/http.?:\/\/.*\.[a-zA-z]{2,3}/),
    }),
  }),
  updateUser,
);

module.exports = router;
