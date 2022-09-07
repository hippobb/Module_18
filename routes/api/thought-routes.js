const router = require('express').Router();
const {
  addthought,
  removethought,
  addReaction,
  removeReaction,
  getAllThought,
  getOneThought,
  editThought,
} = require('../../controllers/thought-controller');

router  
  .route('/')
  .get(getAllThought);

router  
  .route('/:thoughtId')
  .get(getOneThought)
  .put(editThought);

// /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addthought);
  
 // /api/thoughts/<userId>/<thoughtId>
router  
.route('/:userId/:thoughtId') 
  .delete(removethought);

// /api/thoughts/<thoughtId>
router  
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
router  
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
