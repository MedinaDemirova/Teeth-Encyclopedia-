const Order = require('../models/Order');
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


async function addItem(userID, productID, quantity) {
    let user = await User.findById(userID);
    let product = await Product.findById(productID);
    console.log('product:' + product)
    user.items.push({ quantity: quantity, name: product.name, price: product.price });
    return user.save();
}

async function removeAllItems(userID) {
    let user = await User.findById(userID);
    user.items = [];
    return user.save();
}

async function getAllItems(id) {
    let user = await User.findById(id).lean();
    let idArr = Object.values(user.items);
    if (idArr.length == 0) return undefined;
    idArr.forEach(element => { element.price = element.price.toFixed(2) });
    return idArr;
}

function calcTotal(arr) {
    let totalPrice = 0;
    arr.forEach(element => { totalPrice += (element.price * element.quantity) });
    totalPrice = totalPrice.toFixed(2);
    return totalPrice;
}

async function placeOrder(userID, products, adress, phone, email) {
    let productsIDs = [];
    products.forEach(product => { productsIDs.push(product._id) });
    let newOrder = await new Order({ userID, products: productsIDs, adress, email, phone });
    return newOrder.save();
};

module.exports = {
    create,
    getAll,
    getOne,
    getByCategory,
    updateOne,
    deleteOne,
    addItem,
    getAllItems,
    removeAllItems,
    calcTotal,
    placeOrder
}
