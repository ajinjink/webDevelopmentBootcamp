// const fs = require('fs'); // built-in packages
const path = require('path');

const express = require('express'); // third party packages

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views')); // which engine?, path(views dir)
// let express know where it will find the template files that we want to process with the template engine
app.set('view engine', 'ejs'); // can set options for express. engine, name of engine

app.use(express.static('public')); // for every incoming requests, it should check if it is a request to files in public folder
// if not, check the following
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes); // "all" requests starting with '/' is handled by defaultRoutes
// if the incoming request is not in defaultRoutes, check the rest of the routes below
app.use('/', restaurantRoutes);
// if path is /restaurants, the request is handled when the path is .restaurants/restaurants



app.use(function(req, res) { // if not handled by any other handler
    res.status(404).render('404'); // pass 404 as status to browser
});

app.use(function(error, req, res, next) {
    res.status(500).render('500');
})


app.listen(3000);