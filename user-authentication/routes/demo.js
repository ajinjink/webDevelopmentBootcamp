const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  // 이전에 정보를 잘못 기입해서 다시 로드된 창이면
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) { // 이전 정보가 없으면
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: ''
    };
  }

  req.session.inputData = null;

  res.render('signup', {inputData: sessionInputData});
});

router.get('/login', function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      password: ''
    };
  }

  req.session.inputData = null;

  res.render('login', {inputData: sessionInputData});
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // 얘도 ['email']로 접근해도 되긴 함
  const enteredConfirmEmail = userData['confirm-email']; // name에 - 있으면 속성 이름 .으로 접근 불가
  const enteredPassword = userData.password;

  if (!enteredEmail || !enteredConfirmEmail || !enteredPassword || 
    enteredPassword.trim() < 6 || enteredEmail !== enteredConfirmEmail || !enteredEmail.includes('@')) {
      console.log("Incorrect data input");
      
      req.session.inputData = { // 정보 잘못 기입했을 때, 기존에 기입한 정보 그대로 다시 표시 -> 필요한 부분만 수정
        hasError: true,
        message: 'Invalid input - please check your data.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword
      }; // 기입된 정보 저장
      // 여기서는 세션이 사용자 인증과는 관련 없음

      req.session.save(function() { // 저장이 완료되고 나서 redirect
        res.redirect('/signup'); // render 하면 이 양식을 다시 보내겠냐는 확인창 뜸
      }); // 이 안에서 return을 하면 이 익명 함수만 끝나고 아래는 그대로 진행됨
      return;

  }

  const existingUser = await db.getDb().collection('users').findOne({email: enteredEmail});
  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'User exists already!',
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword
    };
    console.log('User exitsts already.');
    req.session.save(function() {
      res.redirect('/signup');
    });
    return;
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
    req.session.inputData = {
      hasError: true,
      message: 'Could not log in - please check your credentials.',
      email: enteredEmail,
      password: enteredPassword
    };
    console.log('Login failed. Invalid email');
    req.session.save(function() {
      res.redirect('/login');
    });
    return;
  }

  const passwordEqual = await bcrypt.compare(enteredPassword, existingUser.password); // unhashed, hashed
  if (!passwordEqual) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      email: enteredEmail,
      password: enteredPassword
    };
    console.log('Login failed. Wrong password');
    req.session.save(function() {
      res.redirect('/login');
    });
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email }; // can access/create session data
  req.session.authenticated = true;
  // session written to db
  // for all response sent, express-session automatically save sessions to db
  // db access slow. redirect가 먼저 끝날 수도 있음
  req.session.save(function() { // 권한이 있어야 하는 페이지로 redirect 했는데, 세션 아직 저장 안 된 상황 방지
    // only runs when saving is finished
    res.redirect('/profile');
  }); // force session to be saved in db

  console.log('Login Succeeded');
});

router.get('/admin', async function (req, res) {
  // check user authentication (session ticket)
  if (!res.locals.isAuth) { // if (!req.session.user)
    return res.status(401).render('401'); // not authenticated
  }

  const user = await db.getDb().collection('users').findOne({_id: req.session.user.id});
  if (!res.locals.isAdmin) {
    return res.status(403).render('403');
  }

  res.render('admin');
});

router.get('/profile', function (req, res) {
  // check user authentication (session ticket)
  if (!res.locals.isAuth) { // if (!req.session.user)
    return res.status(401).render('401'); // not authenticated
  }
  res.render('profile');
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.authenticated = false;
  res.redirect('/');
});

module.exports = router;
