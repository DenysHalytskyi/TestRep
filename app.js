const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const fetch = require('node-fetch');
const app = express();
const path = require('path');

// middleware
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// database connection
const dbURI = 'mongodb+srv://new1:test12345@cluster1.ve6i4ky.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Функція для отримання курсу валют
function getExchangeRates(callback) {
  const urls = {
    USD: 'https://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json',
    EUR: 'https://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json',
    GBP: 'https://api.nbp.pl/api/exchangerates/rates/A/GBP/?format=json',
    CHF: 'https://api.nbp.pl/api/exchangerates/rates/A/CHF/?format=json',
    KRW: 'https://api.nbp.pl/api/exchangerates/rates/A/KRW/?format=json',
    INR: 'https://api.nbp.pl/api/exchangerates/rates/A/INR/?format=json',
    UAH: 'https://api.nbp.pl/api/exchangerates/rates/A/UAH/?format=json',
    CNY: 'https://api.nbp.pl/api/exchangerates/rates/A/CNY/?format=json',
    SEK: 'https://api.nbp.pl/api/exchangerates/rates/A/SEK/?format=json'
  };

  const promises = Object.entries(urls).map(([currency, url]) =>
    fetch(url)
      .then(res => res.json())
      .then(data => ({ [currency]: data.rates[0].mid }))
      .catch(err => ({ [currency]: null }))
  );

  Promise.all(promises)
    .then(results => {
      const rates = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      callback(rates);
    })
    .catch(err => {
      console.error('Помилка запиту:', err.message);
      callback(null);
    });
}

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/crypto', requireAuth, (req, res) => res.render('crypto'));
app.use(authRoutes);

// Додаємо маршрут для отримання курсу валют у форматі JSON
app.get('/api/exchange-rates', (req, res) => {
  getExchangeRates((rates) => {
    if (rates) {
      res.json(rates);
    } else {
      res.status(500).json({ error: 'Не вдалося отримати курси валют' });
    }
  });
});

// Додаємо маршрут для відображення сторінки з курсами валют
app.get('/exchange-rate', (req, res) => {
  res.render('exchange-rate');
});
