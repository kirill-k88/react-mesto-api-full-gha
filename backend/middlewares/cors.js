const allowedCors = [
  'https://superiormesto.students.nomoreparties.co/',
  'http://superiormesto.students.nomoreparties.co/',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  return next();
};
