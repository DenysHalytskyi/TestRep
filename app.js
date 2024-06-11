const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const https = require('https');
const fetch = require('node-fetch'); // Використання require для node-fetch

const app = express();
const path = require('path');

// middleware
app.use(express.static('public'));
app.use(express.static(__dirname)); // Додаємо цей рядок для обслуговування статичних файлів з кореневого каталогу
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Налаштування шляху до папки з шаблонами

// database connection
const dbURI = 'mongodb+srv://new1:test12345@cluster1.ve6i4ky.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Функція для отримання курсу долара
function getExchangeRate(callback) {
  const url = 'https://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json';

  https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
          data += chunk;
      });

      response.on('end', () => {
          const jsonData = JSON.parse(data);
          const exchangeRate = jsonData.rates[0].mid;
          callback(exchangeRate);
      });
  }).on('error', (error) => {
      console.error('Помилка запиту:', error.message);
      callback(null);
  });
}
  
  // routes
  app.get('*', checkUser);
  app.get('/', (req, res) => res.render('home'));
  app.get('/crypto', requireAuth, (req, res) => res.render('crypto'));
  app.use(authRoutes);
  
  

// Додаємо маршрут для отримання курсу долара
app.get('/exchange-rate', (req, res) => {
  getExchangeRate((rate) => {
      if (rate) {
          res.render('exchange-rate', { rate });
      } else {
          res.status(500).send('Не вдалося отримати курс долара');
      }
  });
});
