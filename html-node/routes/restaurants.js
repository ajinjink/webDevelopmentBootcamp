const express = require('express');
const uuid = require('uuid');

const resData = require('../utility/restaurant-data'); // path. require own file
// import func/var from other files

const router = express.Router();

router.get('/restaurants', function(req, res) { // only when access is through exactly '/restaurants'
    let order = req.query.order;
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }
    let nextOrder = 'desc';
    if (order === 'desc') nextOrder = 'asc';

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.sort(function(resA, resB) { // compare func
        if (
            (order === 'asc' && resA.name > resB.name) || 
            (order === 'desc' && resB.name > resA.name)
            ) return 1; // flip
        else return -1;
    });

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length, 
        restaurants: storedRestaurants,
        nextOrder: nextOrder
    }); 
});

router.get('/restaurants/:id', function(req, res) { // /restaurants/r1
    const restaurantId = req.params.id;

    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id == restaurantId) {
             return res.render('restaurant-detail', {restaurant: restaurant});
        }
    }
    res.status(404).render('404');
});

router.get('/recommend', function(req, res) {
    res.render('recommend'); 
});
router.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const restaurants = resData.getStoredRestaurants();
    
    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.redirect('/confirm');
});

router.get('/confirm', function(req, res) {
    res.render('confirm'); 
});

module.exports = router;