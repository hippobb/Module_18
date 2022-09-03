const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    friends: [      
      {
      type: Schema.Types.ObjectId,
      ref: 'user'
      }
  ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of thoughts and reactions on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce(
    (total, thought) => total + thought.reactions.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
