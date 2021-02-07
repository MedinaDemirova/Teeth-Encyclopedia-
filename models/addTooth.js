const mongoose = require('mongoose');

const toothSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
 
    description: {
        type: String,
        minlength: 30,
        required: true

    },
    imageURL: {
        type: String,
        required: true
    },
});

const toothModel = mongoose.model('Tooth', toothSchema);

module.exports = toothModel;