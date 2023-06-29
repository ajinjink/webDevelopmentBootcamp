const express = require('express');

const app = express();

app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:3000/currenttime

app.get('/', function(req, res) {
    res.send('<h1>Hello World!</h1>');
}); // localhost:3000/

app.listen(3000);




// function handleRequest(request, response) {
    
//     if (request.url === '/currenttime') {
//         // localhost:3000/currenttime
//         response.statusCode = 200;
//         response.end('<h1>' + new Date().toISOString() + '</h1>');
//     }
//     else if (request.url === '/') {
//         // localhost:3000
//         response.statusCode = 200;
//         response.end('<h1>Hello World!</h1>');
//     }
// }

// const server = http.createServer(handleRequest);

// server.listen(3000);

