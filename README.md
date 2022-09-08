For the module 18 challenge, we use MongoDB for the social network database.This program can let the user to share the thoughts, react to friends’ thoughts, and create a friend list.

For the user routes:
/api/users
  .get(getAllUser)
  .post(createUser);

/api/users/:userId
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

/api/users/:userId/friends/:friendId
  .post(addFriend)
  .delete(deleteFriend);

For the thought routes:
/api/thoughts/
  .get(getAllThought);

/api/thoughts/:thoughtId
  .get(getOneThought)
  .put(editThought);

/api/thoughts/:userId
  .post(addthought);
  
/api/thoughts/:userId/:thoughtId'
  .delete(removethought);

/api/thoughts/:thoughtId/reactions
  .post(addReaction);

/api/thoughts/:thoughtId/reactions/:reactionId
  .delete(removeReaction);


The source code: https://github.com/hippobb/Module_18
The repo Link :  https://module18.herokuapp.com/
