const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // <- KHAI BÁO SỚM

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dùng layout
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // Tức views/layout.ejs

// Static files (CSS, JS, IMG)
app.use(express.static(path.join(__dirname, 'public')));

// Router
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 404 handler (route không khớp)
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 - Not Found' });
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
