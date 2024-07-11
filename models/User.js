const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email : {
        type: String,
        require: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address.']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
})

// virtual to return the amount of friends in the friends array (friend count)
userSchema.virtual('friendCount').get(function () {return this.friends.length});
// create a model using the user schema
const User = model('User', userSchema);

module.exports = User;