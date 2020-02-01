const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    profile: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    comments: {
        type: String
    },
    user_likes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});



module.exports = Posts = mongoose.model('posts', PostsSchema);