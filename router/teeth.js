const express = require('express');
const router = express.Router();
const factsRouter = require('./factsRouter')

router.get('/', (req, res) => {
    res.render('teeth');
});

router.get('/upper-teeth', (req, res) => {
    res.render('upper-teeth');
});

router.get('/lower-teeth', (req, res) => {
    res.render('lower-teeth');
});


router.get('/videos', (req, res) => {
    res.render('videos');
});

router.use('/facts', factsRouter);


//router.get('/facts', factsRouter);

module.exports = router;








