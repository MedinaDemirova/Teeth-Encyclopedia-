const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const dataService = require('../serveses/dataService');
const categoryRouter = require('../router/e-shop-categories');

//Home Page
router.get('/', async (req, res) => {
    try {
        let products = await dataService.getAll();
        products = products.slice(0, 6);
        products.forEach(element => { element.price = element.price.toFixed(2) });

        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

//Create product
router.get('/create-product', isAdmin, (req, res) => {
    res.render('e-shop/create-product')
});

router.post('/create-product', isAdmin, async (req, res) => {
    try {
        await dataService.create(req.body);
        res.status(201)
        res.redirect('/e-shop');
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

//Details

router.get('/:slug', isAuthenticated, async (req, res) => {
    try {
        let product = await dataService.getOne(req.params.slug)
        console.log(product)
        res.render('e-shop/details', { product: product });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

//Categories

router.use('/categories', categoryRouter);

module.exports = router;