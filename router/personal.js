const express = require('express');
const router = express.Router();
const path = require ('path');

router.get('/my-cv', async(req, res) => {
    try{
    let file = path.join(__dirname,  '../docs/myCV.webp')
   
    await res.download(file, '../public/images/toothAnatomy.jpeg' );
   // res.redirect('/');
    }catch{
        res
        .status(400, 'A required action was not successful! Try again!')
        .redirect('/');
    }
});




//// TO DO: only logged users to be able to download   and see my CV

module.exports = router;