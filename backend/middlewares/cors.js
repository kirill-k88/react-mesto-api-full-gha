const ALLOWED_SOURCES = [
  'https://superiormesto.students.nomoreparties.co/',
  'http://superiormesto.students.nomoreparties.co/',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  console.log(origin);
  if (ALLOWED_SOURCES.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  return next();
};
