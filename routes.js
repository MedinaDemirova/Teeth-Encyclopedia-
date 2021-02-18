const authRoute = require ('./router/auth')
const personalRoute = require('./router/personal');
const teethRoute = require('./router/teeth');

const auth = require ('./middlewares/auth');
const isAuthenticated = require ('./middlewares/isAuthenticated');

const app = require ('express').Router();

app.use (auth());

app.get('/', (req, res) => {
    res.render('homepage')
});

app.use ('/auth', authRoute);

app.use('/personal',isAuthenticated, personalRoute);

app.use('/teeth', teethRoute);

module.exports = app;
