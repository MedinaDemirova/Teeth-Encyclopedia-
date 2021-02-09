const express = require('express');
const router = express.Router();
const authService = require('../serveses/authService');


//Log in
router.get('/logIn', (req, res) => {
    res.render('login')
});


router.post('/logIn', async (req, res) => {
    const { username, password } = req.body;
    try {
        let token = await authService.login(req.body);
       res.cookie('USER_SESSION', token);
        res.redirect('/');
      
    } catch (error) {
        res.render('login', { error })
    }
});

//Register
router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', async (req, res) => {
    let { password, passwordRepeat } = req.body;
    if (password !== passwordRepeat) {
        res.render('register', { error: { message: 'Passwords does not match!' } });
        return;
    }

    try {
        let result = await authService.register(req.body);
        console.log(result)
        res.redirect('/auth/login')
    } catch (error) {
        res.render('register', { error });
        return;
    }
})


module.exports = router;