const express = require('express');
const router = express.Router();

router.get('/my-cv', (req, res) => {
    res.send('this is my cv');
});

//// TO DO: only logged users to be able to download   and see my CV

module.exports = router;