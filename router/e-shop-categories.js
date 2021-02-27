const express = require('express');
const router = express.Router();
const dataService = require('../serveses/dataService');

router.get('/toothpastes', async (req, res) => {
    try {
        let products = await dataService.getByCategory('Toothpaste');
        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

router.get('/toothbrushes', async (req, res) => {
    try {
        let products = await dataService.getByCategory('Tooth brush');
        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

router.get('/dentalflosses', async (req, res) => {
    try {
        let products = await dataService.getByCategory('Dental Floss');
        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

router.get('/teethwhitenings', async (req, res) => {
    try {
        let products = await dataService.getByCategory('Teeth Whitening');
        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

router.get('/others', async (req, res) => {
    try {
        let products = await dataService.getByCategory('Others');
        res.render('e-shop/home', { products: products });
    } catch (err) {
        res.render('e-shop/home', { error: { message: err } });
    }
});

module.exports = router;