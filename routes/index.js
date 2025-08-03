// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('homepageNoLogin', { title: 'Trang chủ chưa đăng nhập' });
});

router.get('/homepage', (req, res) => {
  res.render('homepageLogin', { title: 'Trang chủ đã đăng nhập' });
});

router.get('/playlist', (req, res) => {
  res.render('playlistpage', { title: 'Playlist' });
});

router.get('/artist', (req, res) => {
  res.render('artistdetail', { title: 'Chi tiết nghệ sĩ' });
});

router.get('/album', (req, res) => {
  res.render('albumdetail', { title: 'Chi tiết album' });
});

router.get('/song', (req, res) => {
  res.render('songdetail', { title: 'Chi tiết bài hát' });
});

router.get('/search', (req, res) => {
  res.render('searchpage', { title: 'Tìm kiếm' });
});
router.get('/users', (req, res) => {
  res.render('userdetail', { title: 'Hồ sơ' });
});

module.exports = router;
