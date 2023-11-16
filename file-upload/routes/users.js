const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images'); // 가능한 오류 정보, destination
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 가능한 오류 정보, 파일을 저장할 이름
  }
});

const upload = multer({storage: storageConfig}); // 이미지는 디비 말고 하드에 저장

const router = express.Router();

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function(req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path
  });

  res.redirect('/');
});
// 라우트 핸들링 함수 전에 미들웨어 무제한 추가 가능
// 모든 요청이 아닌, 이 경로에 대해서만 미들웨어 추가하고 싶을 때
// 미드웨어 실행 순서는 좌 -> 우
// multer 파일 배열이나 단일 파일 수신. 여기서는 이미지 하나만 받아서 single, 양식에서 이미지 name

module.exports = router;