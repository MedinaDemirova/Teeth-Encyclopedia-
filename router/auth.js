const express = require('express');
const router = express.Router();
const authService = require('../serveses/authService');


//Log in
router.get('/logIn', (req, res) => {
    res.render('login')
});


//Register
router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', async (req, res) => {
    let {password, passwordRepeat} = req.body;
    if (password !== passwordRepeat){
        res.render('register',{error:{message: 'Passwords does not match!'}});
        return;
    }

    try {
        let result  = await authService.register(req.body);
        res.redirect ('/')
    } catch(error){
        res.render('register',{error});
        return;
    }
})


module.exports = router;