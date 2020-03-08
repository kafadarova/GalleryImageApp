const config = require('config');
const mongoose = require('mongoose');

const db = config.get('mongoURI');
// MongoDB config
const mongoOptions = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// Connect to MongoDB
async function initDB() {
  try {
    await mongoose.connect(db, mongoOptions);
    console.log('MongoDB connected...');
  } catch (err) {
    console.log('ERROR: ', err);
    return err;
  }
}

module.exports = { initDB };
