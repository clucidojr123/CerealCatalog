const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    cerealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cereal'
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: {
            type: String,
        }
    },
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;