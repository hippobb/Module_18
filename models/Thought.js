const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    reactionBody: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    userId:
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const thoughtschema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    userId:
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    thoughtText: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use ReactionSchema to validate data for a reaction
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtschema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const thought = model('thought', thoughtschema);

module.exports = thought;
