const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user : {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});



module.exports = Profile = mongoose.model('profile', ProfileSchema);