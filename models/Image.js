const mongoose = require('mongoose');

const {	Schema } = mongoose;

const ImageSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: true,
  },
});
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
