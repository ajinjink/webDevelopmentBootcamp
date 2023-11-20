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

  req.session.user = { id: existingUser._id, email: existingUser.email }; // can access/create session data
  req.session.authenticated = true;
  // session written to db
  // for all response sent, express-session automatically save sessions to db
  // db access slow. redirect가 먼저 끝날 수도 있음
  req.session.save(function() { // 권한이 있어야 하는 페이지로 redirect 했는데, 세션 아직 저장 안 된 상황 방지
    // only runs when saving is finished
    res.redirect('/admin');
  }); // force session to be saved in db

  console.log('Login Succeeded');
});

router.get('/admin', function (req, res) {
  // check user authentication (session ticket)
  if (!req.session.authenticated) { // if (!req.session.user)
    return res.status(401).render('401'); // not authenticated
  }
  res.render('admin');
});

router.post('/logout', function (req, res) {});

module.exports = router;
