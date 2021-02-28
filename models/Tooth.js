const mongoose = require('mongoose');

const toothSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
 
    description: {
        type: String,
        minlength: 30,

    },
    imageURL: {
        type: String,
        required: true
    },
});

const toothModel = mongoose.model('Tooth', toothSchema);

module.exports = toothModel;