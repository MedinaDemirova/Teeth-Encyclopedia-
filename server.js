const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require ('./router/auth')
const personalRoute = require('./router/personal');
const teethRoute = require('./router/teeth');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs')
const PORT =process.env.PORT || 5005;

//Mongo DB Atlass Setup
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://medina_demirova:65566554@teeth-encyclopedia.jn7c9.mongodb.net/facts?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, usecCeateIndex: true });

app.engine('.hbs', handlebars({ extname: '.hbs' }));

app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('homepage')
});

app.use ('/auth', authRoute);
app.use('/personal', personalRoute);
app.use('/teeth', teethRoute);


app.listen(PORT, () => console.log('Server is listening on port 5000...'));
