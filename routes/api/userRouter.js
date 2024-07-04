const router = require('express').Router();
const {
  findAllUser,
  findOneUser,
  newUser,
  editUser,
  deleteUser,
  newFriend,
  removeFriend,
} = require('../../controllers/user-controller');
// require express router
// require user control functions

// /api/users
router.route('/').get(findAllUser).post(newUser);

// /api/users/:userId
router.route('/:userId').get(findOneUser).put(editUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(newFriend).delete(removeFriend);

module.exports = router;
