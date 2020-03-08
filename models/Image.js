const mongoose = require('mongoose');

const {	Schema } = mongoose;

const ImageSchema = new Schema({
	uid: {
		type: String	
	},
	description: {
		type: String
	},
  path: {
    type: String
  }
})
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
