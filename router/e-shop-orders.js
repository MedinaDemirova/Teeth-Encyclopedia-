const express = require('express');
const router = express.Router();
const dataService = require('../serveses/dataService');

//Show basket
router.get('/my-basket', async(req,res)=>{
    try{
        let products = await dataService.getAllItems(req.user._id);
        res.render('e-shop/my-basket', { products });
    }catch (err){
        res.redirect ('/s-shop');
    }
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
        let productID = product._id;
        await dataService.addItem(userID, productID, quantity);
        console.log('done');
        let products = await dataService.getAllItems(userID);
        console.log (products)
        res.render('e-shop/my-basket', { products });
    } catch (err) {
        res.redirect(`/e-shop/${req.params.slug}`);
    }
});




module.exports = router;