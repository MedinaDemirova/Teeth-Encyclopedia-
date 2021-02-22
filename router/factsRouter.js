const express = require('express');
const router = express.Router();
const Fact = require('../models/createFact');
const isAuthenticated = require('../middlewares/isAuthenticated');

//FACTS Home
router.get('/', async (req, res) => {
    const user = req.user;
    try {
        let facts = await Fact.find({}).sort({ createdAt: 'desc' }).lean();
        facts.forEach(fact => {
            fact.createdAt = fact.createdAt.toUTCString();
            if (user) {
                if (fact.creatorID == user._id || req.app.locals.user.admin) { fact.iAmCreator = true }
            }
        })

        res.render('facts', { facts: facts });
    } catch (err) {
        res
            .status(400, 'Sorry , required action was not successful! Try again!')
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
        await newFact.save();
        res.redirect('/teeth/facts');
    } catch (err) {
        res.render('create-fact', { error: { message: err } });
    }
});

//Edit fact
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let fact = await Fact.findById(req.params.id).lean();
        if (fact.creatorID != req.user._id && !req.app.locals.user.admin) res.redirect('/teeth/facts');

        res.render('edit-fact', { fact })

    } catch (err) {
        res.render('edit-fact', { error: { message: err } });
    }
});

router.put('/edit/:id', async (req, res) => {

    try {
        req.fact = await Fact.findById(req.params.id);
        if (req.fact.creatorID != req.user._id && !req.app.locals.admin) res.redirect('/teeth/facts');
        req.fact.creator = req.body.creator;
        req.fact.content = req.body.content;
        await req.fact.save();
        res.redirect('/teeth/facts');
    } catch (err) {
        res.render('edit-fact', { error: { message: err } });
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