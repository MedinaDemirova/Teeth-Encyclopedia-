const express = require('express');
const router = express.Router();
const Fact = require('../models/createFact')

router.get('/', async (req, res) => {
    try {
        let facts = await Fact.find({}).lean();
        console.log (facts)
        res.render('facts', {facts:facts});
    } catch{
        res
        .status(400, 'A required action was not successful! Try again!')
        .redirect('/teeth');
    }

});

router.get('/create-fact', (req, res) => {
    res.render('create-fact');
});

router.post('/create-fact', async (req, res) => {
    try {
        let newFact = await new Fact({ creator: req.body.creator, content: req.body.content });
        newFact.save();
        res.redirect('/teeth/facts');

    } catch  {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/facts/ctreate-fact');
    }
});




module.exports = router;