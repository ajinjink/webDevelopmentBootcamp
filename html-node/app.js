const fs = require('fs'); // built-in packages
const path = require('path');

const express = require('express'); // third party packages
const uuid = require('uuid');

const resData = require('./utility/restaurant-data'); // path. require own file
// import func/var from other files

const app = express();

app.set('views', path.join(__dirname, 'views')); // which engine?, path(views dir)
// let express know where it will find the template files that we want to process with the template engine
app.set('view engine', 'ejs'); // can set options for express. engine, name of engine

app.use(express.static('public')); // for every incoming requests, it should check if it is a request to files in public folder
// if not, check the following
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render('index'); // render template
    // pasrse a template with a template engine, convert it to html, and send to browser
});

app.get('/restaurants', function(req, res) {
    const storedRestaurants = resData.getStoredRestaurants();

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length, 
        restaurants: storedRestaurants
    }); 
});

app.get('/restaurants/:id', function(req, res) { // /restaurants/r1
    const restaurantId = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id == restaurantId) {
             return res.render('restaurant-detail', {restaurant: restaurant});
        }
    }
    res.status(404).render('404');
});

app.get('/recommend', function(req, res) {
    res.render('recommend'); 
});
app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurants();
    
    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.redirect('/confirm');
});

app.get('/confirm', function(req, res) {
    res.render('confirm'); 
});

app.get('/about', function(req, res) {
    res.render('about'); 
});

app.use(function(req, res) { // if not handled by any other handler
    res.status(404).render('404'); // pass 404 as status to browser
});

app.use(function(error, req, res, next) {
    res.status(500).render('500');
})


app.listen(3000);