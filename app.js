const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session'); // Dùng session để giả lập đăng nhập
const expressLayouts = require('express-ejs-layouts');

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dùng layout
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // Layout mặc định

// Static files (CSS, JS, IMG)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware session
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

// Middleware giả lập trạng thái đăng nhập
app.use((req, res, next) => {
  // Giả lập: nếu vào /login-fake thì cho đăng nhập
  if (req.query.fakeLogin === 'admin') {
    req.session.isAdmin = true;
  }

  res.locals.isLogin = req.session.isAdmin || true;
  res.locals.isUser = !req.session.isAdmin;
  next();
});

// Router chính
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

// Router cho trang người dùng
app.use('/', indexRouter);

// Router cho admin (dùng layoutAdmin)
app.use('/admin', (req, res, next) => {
  res.locals.layout = 'layouts/layoutAdmin'; // Layout riêng cho admin
  next();
}, adminRouter);

// 404 handler (route không khớp)
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
