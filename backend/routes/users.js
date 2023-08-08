const router = require('express').Router();
const {
  bodyUserIdValidator,
  bodyUserValidator,
  bodyAvatarValidator,
} = require('../middlewares/celebrateValidation');

const {
  getAllUsers,
  getUser,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', bodyUserIdValidator, getUser);
router.patch('/me', bodyUserValidator, updateUser);
router.patch('/me/avatar', bodyAvatarValidator, updateUser);

module.exports = router;
