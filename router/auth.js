const express = require('express');
const router = express.Router();
const authService = require('../serveses/authService');
const { tokenName } = require('../secrets/auth');
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

//Log in
router.get('/logIn', isGuest, (req, res) => {
    res.render('auth/login')
});


router.post('/logIn', isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body);
        res.cookie(tokenName, token);
        res.redirect('/');

    } catch (error) {
        res.render('auth/login', { error })
    }
});

//Register
router.get('/register', isGuest, (req, res) => {
    res.render('auth/register')
});

router.post('/register', isGuest, async (req, res) => {
    let { password, passwordRepeat } = req.body;
    if (password !== passwordRepeat) {
        res.render('auth/register', { error: { message: 'Passwords does not match!' } });
        return;
    }

    try {
        let result = await authService.register(req.body);
        res.redirect('/auth/login')
    } catch (error) {

        res.render('auth/register', { error });
        return;
    }
});

//Log Out

router.get('/logout', isAuthenticated, (req, res) => {
    req.app.locals = {};
    res.clearCookie(tokenName);
    res.redirect('/');
});


module.exports = router;