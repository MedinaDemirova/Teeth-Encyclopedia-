const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // id:mongoose.Types.id,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type:Boolean,
        required:true,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema); 