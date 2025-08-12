const express = require('express');
const router = express.Router();

// Trang Dashboard Admin
router.get('/', (req, res) => {
  res.render('admin/Adashboard', { title: 'Admin Dashboard' });
});

// Trang User quản lý
router.get('/users', (req, res) => {
  res.render('admin/AUserpage', { title: 'Quản lý User' });
});

// Trang Song
router.get('/songs', (req, res) => {
  res.render('admin/ASongpage', { title: 'Quản lý bài hát' });
});

// Trang Artist
router.get('/artists', (req, res) => {
  res.render('admin/AArtistpage', { title: 'Quản lý nghệ sĩ' });
});

// Trang Album
router.get('/reports', (req, res) => {
  res.render('admin/AReportpage', { title: 'Quản lý album' });
});

// Trang đổi mật khẩu
router.get('/change-password', (req, res) => {
  res.render('admin/AChangePass', { title: 'Đổi mật khẩu' });
});

// Tạo admin mới
router.get('/create-admin', (req, res) => {
  res.render('admin/ACreateNewAdmin', { title: 'Tạo admin mới' });
});

// Trang profile
router.get('/profile', (req, res) => {
  res.render('admin/AProfile', { title: 'Thông tin Admin' });
});

module.exports = router;
