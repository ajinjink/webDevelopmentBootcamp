const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
}); // localhost:3000/currenttime

app.get('/', function(req, res) {
    res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"></form>');
}); // localhost:3000/

app.post('/store-user', function(req, res) {
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json');

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData); // json -> raw js object

    existingUsers.push(userName); // append

    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // js values -> raw json format text

    res.send('<h1>Username stored!</h1>')
});

app.listen(3000);

