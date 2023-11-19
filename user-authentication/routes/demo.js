const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  res.render('signup');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // 얘도 ['email']로 접근해도 되긴 함
  const enteredConfirmEmail = userData['confirm-email']; // name에 - 있으면 속성 이름 .으로 접근 불가
  const enteredPassword = userData.password;

  if (!enteredEmail || !enteredConfirmEmail || !enteredPassword || 
    enteredPassword.trim() < 6 || enteredEmail !== enteredConfirmEmail || !enteredEmail.includes('@')) {
      console.log("Incorrect data input");
      return res.redirect('/signup');
  }

  const existingUser = await db.getDb().collection('users').findOne({email: enteredEmail});
  if (existingUser) {
    console.log('User exitsts already.');
    return res.redirect('/signup');
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12); // 암호화 할 대상, 암호화 강도

  const user = {
    email: enteredEmail,
    password: hashedPassword
  };

  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db.getDb().collection('users').findOne({email: enteredEmail});
  if (!existingUser) {
    console.log('Login failed. Invalid email');
    return res.redirect('/login');
  }

  const passwordEqual = await bcrypt.compare(enteredPassword, existingUser.password); // unhashed, hashed
  if (!passwordEqual) {
    console.log('Login failed. Wrong password');
    return res.redirect('/login');
  }

  console.log('Login Succeeded');
  res.redirect('/admin');
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) {});

module.exports = router;
