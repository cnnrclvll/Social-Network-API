const router = require('express').Router();
const {
  findAllThought,
  findOneThought,
  newThought,
  editThought,
  deleteThought,
  onReaction,
  offReaction,
} = require('../../controllers/thought-controller');
// require express rotuer
// thought control functions

// /api/thoughts
router.route('/').get(findAllThought).post(newThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(findOneThought).put(editThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(onReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(offReaction);

module.exports = router;
