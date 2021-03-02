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
router.get ('/show-orders', isAdmin, async(req,res)=>{
let orders = await dataService.getOrders();
console.log (orders);
res.render ('e-shop/orders', {orders})
});


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
        let productID = product._id;
        await dataService.addItem(userID, productID, quantity);
        res.redirect('/e-shop/order/my-basket');
    } catch (err) {
        res.redirect(`/e-shop/${req.params.slug}`);
    }
});


//Add shipping info and place order
router.get('/confirm', (req, res) => {
    res.render('e-shop/shipping-info');
});

router.post('/confirm', async (req, res) => {
    let userID = req.user._id;
    let { adress, phone, email } = req.body;
    let products = await dataService.getAllItems(userID);
    await dataService.placeOrder(userID, products, adress, phone, email);
    await dataService.removeAllItems(userID);
    res.render('e-shop/home', { success: { message: 'Your order was successful!' } });
});

//Empty basket
router.get('/empty-my-basket', async (req, res) => {
    let userID = req.user._id;
    await dataService.removeAllItems(userID);
    res.render('e-shop/home', { success: { message: 'Your basket  is empty' } });
});

module.exports = router;