const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/my-cv', async (req, res) => {
    try {
        file = path.join(__dirname, '../public/images/myCV.docx');
        console.log ( file)
        await res.download(file);
    }catch{
    res
        .status(400, 'A required action was not successful! Try again!')
        .redirect('/');
}
});

module.exports = router;