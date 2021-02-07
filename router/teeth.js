const express = require('express');
const router = express.Router();
const factsRouter = require('./factsRouter');
const galleryRouter = require('./galleryRouter');

router.get('/', (req, res) => {
    res.render('teeth');
});

router.get('/teeth-anatomy', (req, res) => {
    res.render('teeth-anatomy');
});




router.get('/conditions', (req, res) => {
    res.render('teeth-conditions');
});

router.get('/tests-and-treatments', (req, res) => {
    res.render('tests-and-treatments');
});

router.use('/gallery',galleryRouter);

router.use('/facts', factsRouter);

module.exports = router;








