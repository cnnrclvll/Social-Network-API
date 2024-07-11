const { model, Schema } = require('mongoose');
const format_date = require('../utils/formatDate');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt : {
        type: Date,
        default: Date.now,
        get: timestamp => format_date(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ],
},
{
    toJSON: {
        getters: true,
    },
    id: false,
})

// virtual to return the amount of reactions in the reactions array (reactions count)
thoughtSchema.virtual('reactionCount').get(function() {return this.reactions.length});
// create model using the thought schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;