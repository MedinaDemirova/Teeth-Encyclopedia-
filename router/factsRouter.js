const express = require('express');
const router = express.Router();
const Fact = require('../models/createFact');
const isAuthenticated = require ('../middlewares/isAuthenticated');

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
router.get('/create-fact',isAuthenticated, (req, res) => {
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

//Edit fact
router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try {
        let fact = await Fact.findById(req.params.id).lean();
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
router.delete('/:id', async (req, res) => {
    await Fact.findByIdAndDelete(req.params.id);
    res.redirect('/teeth/facts');
});




module.exports = router;