const app = require ('express').Router();
const authRoute = require ('./router/auth')
const personalRoute = require('./router/personal');
const teethRoute = require('./router/teeth');

const auth = require ('./middlewares/auth');
const isAuthenticated = require ('./middlewares/isAuthenticated');

app.use (auth());

app.get('/', (req, res) => {
    res.render('homepage')
});

app.use ('/auth', authRoute);

app.use('/personal',isAuthenticated, personalRoute);

app.use('/teeth', teethRoute);

module.exports = app;
