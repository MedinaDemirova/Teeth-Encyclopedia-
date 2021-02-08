const express = require('express');
const router = express.Router();
const Tooth = require('../models/addTooth');

//Teeth Gallery Home and Search 
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        let teeth = await Tooth.find(searchOptions).lean();
        res.render('teethGallery', {
            teeth: teeth,
            searchOptions: req.query
        })
    } catch{
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/gallery');
    }
});

//Read more
router.get('/show/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let tooth = await Tooth.findById(id).lean();
        res.render('showTooth', { tooth });
    } catch{
        res.redirect('/teeth/gallery');
    }
});

//Create tooth
router.get('/add-tooth', (req, res) => {
    res.render('add-tooth');
});

router.post('/add-tooth', async (req, res) => {
    try {
        let newTooth = await new Tooth({ name: req.body.name, description: req.body.description, imageURL: req.body.imageURL });
        newTooth.save();
        res.redirect('/teeth/gallery');

    } catch  {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/gallery/add-tooth');
    }
});



//Edit tooth
router.get('/:id/edit', async (req, res) => {
    let id = req.params.id;
    try {
        let tooth = await Tooth.findById(req.params.id).lean();
        res.render('edit-tooth', { tooth })
    } catch {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect(`/teeth/gallery/${id}`);
    }
});

router.put('/:id/edit', async (req, res) => {
    try {
        req.tooth = await Tooth.findById(req.params.id);
        req.tooth.name = req.body.name;
        req.tooth.description = req.body.description;
        req.tooth.imageURL= req.body.imageURL;
        await req.tooth.save();
        res.redirect(`/teeth/gallery/${id}`);
    } catch  {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect(`/teeth/gallery`);
    }
});


//Delete tooth
router.delete('/:id', async (req, res) => {
    await Tooth.findByIdAndDelete(req.params.id);
    res.redirect('/teeth/gallery');
});



module.exports = router;