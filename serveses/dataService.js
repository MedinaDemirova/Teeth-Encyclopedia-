
const Product = require('../models/Product');

async function create(data) {
        let { name, description, imageURL, category, price } = data;
        let newProduct = await new Product({ name, description, imageURL, category, price });
        return newProduct.save();
}

async function getAll() {
        return await Product.find({}).sort({ 'createdAt': 'desc' }).lean();
}

async function getOne(slug) {
        return await Product.findOne({ slug }).lean();
}

async function getByCategory(selecterCategory) {
    let products = await Product.find({ category: selecterCategory }).lean();
    return products;
}

module.exports = {
    create,
    getAll,
    getOne,
    getByCategory
}
