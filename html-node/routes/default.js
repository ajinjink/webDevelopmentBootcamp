const express = require('express');

const router = express.Router();
// app.js runs express(), and therefore cannot run it here again
// use Router instead of app

router.get('/', function(req, res) {
    res.render('index'); // render template
    // parsse a template with a template engine, convert it to html, and send to browser
});

router.get('/about', function(req, res) {
    res.render('about'); 
});

module.exports = router; // router is an object. added configuration