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
        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

//Details
router.get('/:slug', isAuthenticated, async (req, res) => {
    try {
        let product = await dataService.getOne(req.params.slug)

        res.render('e-shop/details', { product: product });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});



//////  ADMIN ONLY  ///// 

//Create product
router.get('/create-product', isAdmin, (req, res) => {
    console.log ('hello')
    res.render('e-shop/create-product');
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

//Edit product
router.get('/:slug/edit', isAdmin, async (req, res) => {
    try {
        let product = await dataService.getOne(req.params.slug)
        res.render('e-shop/edit-product', { product })
    } catch (err) {
        res
            .redirect(`/e-shop/${req.params.slug}`), { error: { message: err } };
    }
});


router.put('/:slug/edit', isAdmin, async (req, res) => {
    try {
        let { imageURL, name, description, category, price } = req.body;
        await dataService.updateOne(req.params.slug, imageURL, name, description, category, price);
        res.redirect('/e-shop');
    } catch (err) {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/e-shop');
    }
});


//Delete product
router.delete('/:id', isAdmin, async (req, res) => {
    await dataService.deleteOne(req.params.id);

    res.redirect('/e-shop');
});



//Categories
router.use('/categories', categoryRouter);

module.exports = router;