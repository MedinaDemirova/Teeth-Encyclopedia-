const express = require('express');
const router = express.Router();
const dataService = require('../serveses/dataService');
const isAdmin = require('../middlewares/isAdmin');

//Show basket
router.get('/my-basket', async (req, res) => {
    try {
        let total = undefined;
        let products = await dataService.getAllItems(req.user._id);
        if (products) { total = await dataService.calcTotal(products) }
        res.render('e-shop/my-basket', { products, total });
    } catch (err) {
        res.redirect('/e-shop');
    }
});

//Show orders to admin
router.get('/show-orders', isAdmin, async (req, res) => {
    let orders = await dataService.getOrders();
    orders.forEach(order => { order.createdAt = order.createdAt.toLocaleString() });
    res.render('e-shop/orders', { orders })
});

//Show order details to admin
router.get('/:id/details', isAdmin, async (req, res) => {
    let order = await dataService.getOrderById(req.params.id);
    let products = order.products;
    let orderID = order._id;
    peoducts = await dataService.findProductAndSetName(products);
    products.forEach(product => { product.orderID = order._id });
    res.render('e-shop/order-details', { products,orderID })
});

//Complete order admin
router.get('/:id/complete-order', async (req, res) => {
    await dataService.completeOrderById(req.params.id);
    res.render('e-shop/orders', { success: { message: 'Order completed and removed from database!' } });

})

//Add to basket
router.get('/:slug/add-to-basket', async (req, res) => {
    try {
        let product = await dataService.getOne(req.params.slug);
        res.render('e-shop/add-to-basket', { product });
    } catch (err) {
        res.redirect(`/e-shop/${req.params.slug}`);
    }
});

router.post('/:slug/add-to-basket', async (req, res) => {
    try {
        let quantity = req.body.quantity;
        let userID = req.user._id;
        let product = await dataService.getOne(req.params.slug);
        console.log (product._id)
        let productID = product._id;
        await dataService.addItem(userID, productID, quantity);
        res.redirect('/e-shop');
    } catch (err) {
        res.redirect(`/e-shop/${req.params.slug}`);
    }
});


//Add shipping info and place order
router.get('/confirm', (req, res) => {
    res.render('e-shop/shipping-info');
});

router.post('/confirm', async (req, res) => {
    try {
        let userID = req.user._id;
        let { adress, phone, email } = req.body;
        let products = await dataService.getAllItems(userID);
        console.log(products);
        await dataService.placeOrder(userID, products, adress, phone, email);
        await dataService.removeAllItems(userID);
        res.render('e-shop/home', { success: { message: 'Your order was successful!' } });
    } catch (err) {
        res.render('e-shop/shipping-info', { error: { message: err } });
    }
});

//Empty basket
router.get('/empty-my-basket', async (req, res) => {
    let userID = req.user._id;
    await dataService.removeAllItems(userID);
    let products = await dataService.getAll();
    products = products.slice(0, 6);
    res.render('e-shop/home', { products, success: { message: 'Your basket  is empty' } });
});

module.exports = router;