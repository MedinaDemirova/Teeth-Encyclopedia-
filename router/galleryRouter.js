const express = require('express');
const router = express.Router();
const Tooth = require('../models/addTooth');

//Teeth Gallery Home
router.get('/', async (req, res) => {
    try {
        let teeth = await Tooth.find({}).lean();
        res.render('teethGallery', { teeth: teeth });
    } catch{
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/gallery');
    }
});

//Read more
router.get('/show/:id', async(req, res) => {
    let id = req.params.id;
    console.log(id)
    try{
    let tooth = await Tooth.findOne({ id }).lean();
    res.render('showTooth', {tooth});
    }catch{
        res.redirect('/teeth/gallery');
    } 
});

//Create tooth
router.get('/add-tooth', (req, res) => {
    res.render('add-tooth');
});

router.post('/add-tooth', async (req, res) => {
    try {
        let newTooth = await new Tooth({ name: req.body.name, description: req.body.description,imageURL: req.body.imageURL });
        newTooth.save();
        res.redirect('/teeth/gallery');

    } catch  {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/gallery/add-tooth');
    }
});

/*
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


*/

module.exports = router;