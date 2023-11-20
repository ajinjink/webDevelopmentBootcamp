const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const MongoDBStore = mongodbStore(session); // class. connect with session package

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017', // url
  databaseName: 'auth-demo',
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'super-secret', // key used internally for securing session(cookie). session can't be faked
  resave: false, // session is only updated in the db when the data is actually changed (not for each incoming req)
  saveUninitialized: false, // session is stored in db when data exists
  store: sessionStore // where it should be stored
}));

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(5000);
});
