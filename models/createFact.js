const mongoose = require('mongoose');
const { name_pattern } = require('../secrets/auth');

const factSchema = new mongoose.Schema({
    creator: {
        type: String,
        required:[true, 'Creator field is requred!'],
        minlength: [3, 'Creator name must be at least 3 symbols!'],
     validate:{
        validator: (value) => {
            return name_pattern .test(value)
        },
        message: (props) => { 
             return `${props.value} is invalid username! Username must contain only english letters!`
        }
     }
    },
    content: {
        type: String,
        minlength: [20,'Content must be minimum 20 characters long!'],
        required: [true, 'Content field is requred!']
,    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    creatorID: {
        type: String,
        required: true
    }
});

factSchema.pre("save", function(){
    this.creator = this.creator.toUpperCase()
});



const factModel = mongoose.model('Fact', factSchema);

module.exports = factModel;