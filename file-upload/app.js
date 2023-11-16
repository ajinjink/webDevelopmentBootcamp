const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));  // form data without files
app.use(express.static('public')); // make it available to users
app.use('/images', express.static('images')); // '/images'로 시작하는 경로를 가졌을 때만 미들웨어 활성화
// images 폴더를 static 처리하면 이미지 파일 경로 'images/1789á8.PNG'에서 앞에 'images/' 부분을 날려야 함
// 라우트 핸들러에서 이미지 경로를 넘겨주지 않고 이미지 이름을 넘겨주는 방식도 사용 가능

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(5000);
});
