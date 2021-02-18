const express = require('express');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const {PORT} = require('./secrets/auth');
const routes = require ('./routes');
const methodOverride = require('method-override');

require('./configs/mongoose');

require ('./configs/express-handlebars')(app);

app.use(mongoSanitize());

app.use(methodOverride('_method'));

app.use (routes);

app.listen(PORT, () => console.log('Server is listening on port 5000...'));
