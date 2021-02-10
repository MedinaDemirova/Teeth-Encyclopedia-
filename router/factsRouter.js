const express = require('express');
const router = express.Router();
const Fact = require('../models/createFact');
const isAuthenticated = require('../middlewares/isAuthenticated');

//FACTS Home
router.get('/', async (req, res) => {
    try {
        let facts = await Fact.find({}).sort({ createdAt: 'desc' }).lean();

        res.render('facts', { facts: facts });
    } catch{
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth');
    }
});

//Create fact
router.get('/create-fact', isAuthenticated, (req, res) => {
    res.render('create-fact');
});

router.post('/create-fact', isAuthenticated, async (req, res) => {
    try {
        let newFact = await new Fact({ creator: req.body.creator, content: req.body.content, creatorID: req.app.locals.user._id });
        newFact.save();
        res.redirect('/teeth/facts');
    } catch  {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/facts/ctreate-fact');
    }
});
//To DO : make sure that only creator can edit and delete  fact


//Edit fact
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let fact = await Fact.findById(req.params.id).lean();
        if (fact.creatorID != req.user._id && !req.app.locals.user.admin) res.redirect('/teeth/facts');

        res.render('edit-fact', { fact })

    } catch {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/facts');
    }
});

router.put('/edit/:id', async (req, res) => {

    try {
        req.fact = await Fact.findById(req.params.id);
        if (fact.creatorID != req.user._id  && !req.app.locals.admin) res.redirect('/teeth/facts');
        req.fact.creator = req.body.creator;
        req.fact.content = req.body.content;
        await req.fact.save();
        res.redirect('/teeth/facts');
    } catch  {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/facts');
    }
});

//Delete fact
router.post('/:id', async (req, res) => {
    let fact = await Fact.findById(req.params.id);
    if (fact.creatorID != req.user._id) {
        res.redirect('/teeth/facts');
    } else {
        await Fact.findByIdAndDelete(req.params.id);
    }

    res.redirect('/teeth/facts');
});




module.exports = router;