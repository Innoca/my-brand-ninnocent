const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    blogComment: {
        type: String,
        default: ""
    }

})


module.exports = mongoose.model('BlogComment', commentSchema)