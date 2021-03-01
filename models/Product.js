const mongoose = require('mongoose');
const slugify = require ('slugify');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Creator field is requred!'],
        minlength: [3, 'Name must be at least 3 symbols!'],
    },
    price:{
        type:Number,
        required:true
    },
    description: {
        type: String,
        minlength: [20, 'Content must be minimum 20 characters long!'],
        required: [true, 'Content field is requred!']
        ,
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    imageURL: {
        type: String,
        required: [true, 'Image URL field is requred!']
    },
    category: {
        type: String,
        required: [true, 'Image URL field is requred!']
    },
    slug: {
        unique: false,
        required: true,
        type: String
    },
    comments: [],
    likes: [],
});

productSchema.pre('validate', function (next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }
    next();
}); 

productSchema.pre("save", function () {
    this.name = this.name.toUpperCase();
});


const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;