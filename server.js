const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/users', require('./controllers/userController'));
app.use('/api/announcements', require('./controllers/announcementController'));
app.use('/api/admin', require('./controllers/adminController'));

// Error handling
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Маршрут не знайдено' });
});

app.use((err, req, res, next) => {
  console.error('Глобальна помилка:', err);
  res.status(500).json({ error: 'Внутрішня помилка сервера' });
});

// Initialize and start server
require('./utils/initializeData')()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
      console.log(`API доступне за адресою: http://localhost:${PORT}/api`);
      console.log(`Тестовий адмін: admin@example.com / admin123`);
    });
  })
  .catch(console.error);