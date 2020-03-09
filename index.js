require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { initDB } = require('./config/db');

// Routes
const images = require('./routes/images');

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

(async () => {
  await initDB();
})();

app.use('/api/images', images);

// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options('*', cors());

app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
