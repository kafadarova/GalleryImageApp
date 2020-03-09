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

// CORS Middleware
app.use(cors());

// Middlewares
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

(async () => {
  await initDB();
})();

app.use('/api/images', images);


app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
