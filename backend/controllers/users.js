const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { checkResult } = require('./validation');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(checkResult)
    .then((user) => res.send(user))
    .catch(next);
};
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then(checkResult)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return User.create(req.body);
    })
    .then((user) => res.send({
      name: user.name,
      avatar: user.avatar,
      about: user.about,
      email: user.email,
    }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'kilimanjaro', {
        expiresIn: '7d',
      });
      /* return res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      }); */
      return res.send({ token });
    })
    .catch(next);
};
