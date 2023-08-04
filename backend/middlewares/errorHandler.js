module.exports = (err, req, res, next) => {
  if (err.message.includes('to be unique')) {
    return res
      .status(409)
      .send({ message: 'Ползователь с таким email уже существует' });
  }
  if (!err.statusCode) {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
  res.status(err.statusCode).send({ message: err.message });

  return next();
};
