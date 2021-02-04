const express = require('express');
const router = express.Router();
const factsRouter = require('./factsRouter')

router.get('/', (req, res) => {
    res.render('teeth');
});

router.get('/teeth-anatomy', (req, res) => {
    res.render('teeth-anatomy');
});


router.get('/show/:id', async(req, res) => {
        let id = req.params.id;
        console.log(id)
        try{
        let tooth = await Teeth.findOne({ id }).lean();
        res.render('showTooth', {tooth});
        }catch{
            res.redirect('/teeth');
        } 
});

router.get('/conditions', (req, res) => {
    res.render('teeth-conditions');
});

router.get('/tests-and-treatments', (req, res) => {
    res.render('tests-and-treatments');
});

router.get('/videos', (req, res) => {
    res.render('videos');
});

router.use('/facts', factsRouter);


//router.get('/facts', factsRouter);

module.exports = router;








