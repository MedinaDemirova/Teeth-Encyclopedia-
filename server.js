const express = require('express');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const {PORT} = require('./secrets/auth');

//Routes
const authRoute = require ('./router/auth')
const personalRoute = require('./router/personal');
const teethRoute = require('./router/teeth');

const methodOverride = require('method-override');

const auth = require ('./middlewares/auth');
const isAuthenticated = require ('./middlewares/isAuthenticated');

require('./configs/mongoose');
require ('./configs/express-handlebars')(app);

app.use(mongoSanitize());
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));

app.use (auth());

//Routes
app.get('/', (req, res) => {
    res.render('homepage')
});
app.use ('/auth', authRoute);
app.use('/personal',isAuthenticated, personalRoute);
app.use('/teeth', teethRoute);


app.listen(PORT, () => console.log('Server is listening on port 5000...'));
