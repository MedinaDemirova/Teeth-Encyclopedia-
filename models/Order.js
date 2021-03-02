const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },

    products: [{
        quantity: Number
    }],
    adress:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;