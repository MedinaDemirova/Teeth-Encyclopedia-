const handlebars = require('express-handlebars');
const express = require ('express');
const cookiesParser = require ('cookie-parser');

module.exports = (app) => {
    app.engine('.hbs', handlebars({ extname: '.hbs' }));

    app.set('view engine', '.hbs');

    app.use(express.static("public"));

    app.use(express.urlencoded({ extended: true }));
    
    app.use (cookiesParser());
}