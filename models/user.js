const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    photo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


//User is internal name to users collection. A pointer to the users table. 
module.exports = User = mongoose.model('users', UserSchema);