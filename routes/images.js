const express = require('express');
const router = express.Router();

const { uploadImage, deleteImage } = require('../services/file-upload');
const singleImageUpload = uploadImage.single('image');

// Load image model
const Image = require('../models/image');

router.get('/', async (req, res) => {
	try {
		const images = await Image.find({});
		res.status(200).send(images);
	} catch (e) {
		res.send(e);
	}
});

/**
*  @route   POST api/images/upload
*  @desc    Upload an image
*  @access  Public
*/
router.post('/upload', async (req, res) => {
	const data = req.body;
	try {
		singleImageUpload(req, res, async (err) => {
			if (err) {
				return res.status(422).send({
					errors: [{
						title: 'File Upload Error',
						detail: err.message
					}]
				});
			}
      data.uid = req.file.key;
      data.path = req.file.location;
  		const image = await new Image(data).save();
  		res.status(200).send(image);
		});
	} catch (e) {
		res.send(e);
	}
});

// @route   PUT api/images/:id
// @desc    Edit an image
// @access  Public
router.put('/:uid', async (req, res) => {
	const {
		uid
	} = req.params;
	const data = req.body;
	try {
		const image = await Image.findOneAndUpdate({uid}, data, {
			new: true
		});
		res.status(200).send(image);
	} catch (e) {
		res.send(e);
	}
});

// @route   Delete api/images/:id
// @desc    Delete an image
// @access  Public
router.delete('/:id', async (req, res) => {
	const {
		id
	} = req.params;
	try {
    deleteImage(res);
		//const image = await Image.findOneAndRemove(id);
		//res.status(200).send(image);
	} catch (e) {
		res.send(e);
	}
});

module.exports = router;
