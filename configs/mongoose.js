const mongoose = require ('mongoose');
const {URI_Atlass} = require ('../secrets/auth');
const mongoSanitize = require('express-mongo-sanitize');

//Mongo DB Atlass Setup
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(URI_Atlass, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    client.close();
});

mongoose.connect(URI_Atlass, { useNewUrlParser: true, useUnifiedTopology: true, usecCeateIndex: true });

module.exports = client;