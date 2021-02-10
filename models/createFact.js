const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true,
        minlength: 3
    },
    content: {
        type: String,
        minlength: 20,
        required: true

    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    creatorID:{
        type: String,
        required:true
    }
});

const factModel = mongoose.model('Fact', factSchema);

module.exports = factModel;