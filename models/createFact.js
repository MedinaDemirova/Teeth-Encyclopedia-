const mongoose = require('mongoose');
const { english_letters_numbers_pattern, english_letters_pattern } = require('../secrets/auth');

const factSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: (value) => {
                return english_letters_pattern.test(value)
            },
            message: (props) => {
                return `Creator name must contains only english letters!`
            }
        }
    },
    content: {
        type: String,
        minlength: 20,
        required: true,
        validate: {
            validator: (value) => {
                return english_letters_numbers_pattern.test(value)
            },
            message: (props) => {
                return `Creator name must contains only english letters and numbers!`
            }
        }

    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    creatorID: {
        type: String,
        required: true
    }
});

const factModel = mongoose.model('Fact', factSchema);

module.exports = factModel;