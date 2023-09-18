const router = require('express').Router();
const {
  getAllUsers, getUserId, createUser, updateProfile, updateAvatar, wrongUrl,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
router.patch('/', wrongUrl);
module.exports = router;
