const { celebrate, Joi } = require('celebrate');
const { REGXP_URL } = require('../utils/constants');

module.exports.bodySigninValidator = celebrate({
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
});

module.exports.bodySignupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGXP_URL),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.bodyCardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().message('Передан некорректный id'),
  }),
});

module.exports.bodyUserIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().message('Передан некорректный id'),
  }),
});

module.exports.bodyCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGXP_URL),
  }),
});

module.exports.bodyUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGXP_URL),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.bodyAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGXP_URL),
  }),
});
