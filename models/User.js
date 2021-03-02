const mongoose = require('mongoose');
const {english_letters_numbers_pattern, en} = require('../secrets/auth');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is requred!'],
        unique: true,
        minlength: [5, `Username must be least 6 characters long!`],
        validate: {
            validator: (value) => {
                return english_letters_numbers_pattern .test(value)
            },
            message: (props) => { 
                 return `${props.value} is invalid username! Username must contain only english letters and digits!`
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: (value) => {
                return english_letters_numbers_pattern .test(value)
            },
            message: (props) => { 
                 return `Password must contain only english letters and digits!`
            }
        }
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    items: [{
        productID: String,
        quantity:String,
        name:String,
        price:Number
    }]
});

module.exports = mongoose.model('User', userSchema); 