const router = require('express').Router();
const {
  bodyCardIdValidator,
  bodyCardValidator,
} = require('../middlewares/celebrateValidation');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', bodyCardIdValidator, deleteCard);
router.post('/', bodyCardValidator, createCard);
router.put('/:cardId/likes', bodyCardIdValidator, likeCard);
router.delete('/:cardId/likes', bodyCardIdValidator, dislikeCard);

module.exports = router;
