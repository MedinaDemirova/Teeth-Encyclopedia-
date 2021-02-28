const express = require('express');
const router = express.Router();
const Tooth = require('../models/Tooth');
const isAdmin = require('../middlewares/isAdmin');

//Teeth Gallery Home and Search 
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        let teeth = await Tooth.find(searchOptions).lean();
        res.render('teeth-gallery/teethGallery', {
            teeth: teeth,
            searchOptions: req.query,

        })
    } catch (err) {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/gallery', { error: { message: err } });
    }
});

//Read more
router.get('/show/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let tooth = await Tooth.findById(id).lean();
        res.render('teeth-gallery/showTooth', { tooth });
    } catch (err) {
        res.redirect('/teeth/gallery', { error: { message: err } });
    }
});

//Create tooth
router.get('/add-tooth', isAdmin, (req, res) => {
    res.render('teeth-gallery/add-tooth');
});

router.post('/add-tooth', async (req, res) => {
    try {
        let newTooth = await new Tooth({ name: req.body.name, description: req.body.description, imageURL: req.body.imageURL });
        newTooth.save();
        res.redirect('/teeth/gallery');

    } catch (err) {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect('/teeth/gallery/add-tooth', { error: { message: err } });
    }
});

//Edit tooth
router.get('/:id/edit', isAdmin, async (req, res) => {
    let id = req.params.id;
    try {
        let tooth = await Tooth.findById(req.params.id).lean();
        res.render('teeth-gallery/edit-tooth', { tooth })
    } catch (err) {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect(`/teeth/gallery/${id}`), { error: { message: err } };
    }
});

router.put('/:id/edit', isAdmin, async (req, res) => {
    try {
        req.tooth = await Tooth.findById(req.params.id);
        req.tooth.name = req.body.name;
        req.tooth.description = req.body.description;
        req.tooth.imageURL = req.body.imageURL;
        await req.tooth.save();
        res.redirect(`/teeth/gallery/${id}`);
    } catch (err) {
        res
            .status(400, 'A required action was not successful! Try again!')
            .redirect(`/teeth/gallery`, { error: { message: err } });
    }
});

//Delete tooth
router.delete('/:id', isAdmin, async (req, res) => {
    await Tooth.findByIdAndDelete(req.params.id);
    res.redirect('/teeth/gallery');
});

module.exports = router;