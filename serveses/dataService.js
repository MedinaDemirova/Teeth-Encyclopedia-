
const Product = require('../models/Product');
const User = require('../models/User');

async function create(data) {
    let { name, description, imageURL, category, price } = data;
    let newProduct = await new Product({ name, description, imageURL, category, price });
    return newProduct.save();
}

async function getAll() {
    let products = await Product.find({}).sort({ 'createdAt': 'desc' }).lean();
    products.forEach(element => { element.price = element.price.toFixed(2) });
    return products;
}

async function getOne(slug) {
    let product = await Product.findOne({ slug }).lean();
    product.price = product.price.toFixed(2);
    return product;
}

async function getByCategory(selecterCategory) {
    let products = await Product.find({ category: selecterCategory }).lean();
    if (products) products.forEach(element => { element.price = element.price.toFixed(2) });
    return products;
}


async function updateOne(slug, imageURL, name, description, category, price) {
    let product = await Product.findOne({ slug }).lean();
    product.name = name;
    product.description = description;
    product.imageURL = imageURL;
    product.price = price;
    product.category = category;
    // .save() doesntn work
    return product.save();
};


async function deleteOne(id) {
    return await Product.findByIdAndDelete(id);
}


async function addItem(userID, id, quantity) {
    let user = await User.findById(userID);
    user.items.push({ id, quantity });
    return user.save();
}


async function getAllItems(id) {
    let items = await User.findById(id).populate('items');
    return items;
}


module.exports = {
    create,
    getAll,
    getOne,
    getByCategory,
    updateOne,
    deleteOne,
    addItem,
    getAllItems
}
