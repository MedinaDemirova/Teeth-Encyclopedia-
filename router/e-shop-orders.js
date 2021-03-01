const express = require('express');
const router = express.Router();
const dataService = require('../serveses/dataService');


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
        let id = product._id;
        console.log  (id)
//do tuk done
        await dataService.addItem(userID, id, quantity);
        console.log('done');
        let products = await dataService.getAllItems(userID);
        res.render('e-shop/my-basket', { products });
    } catch (err) {
        res.redirect(`/e-shop/${req.params.slug}`);
    }
});

//Show basket



module.exports = router;