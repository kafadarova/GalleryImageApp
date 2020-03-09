const express = require('express');
const multer = require('multer');
const config = require('config');

const router = express.Router();
const upload = multer();

const { uploadImage, deleteImage } = require('../services/file-upload');

// Load image model
const Image = require('../models/Image');

/**
*  @route   GET api/images/
*  @desc    Fetch all images
*  @access  Public
*/
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
router.post('/upload', uploadImage.array('image', 1), async (req, res) => {
  const data = {
    uid: req.files[0].key,
    description: req.body.description,
    path: req.files[0].location,
  };

  try {
    const image = await new Image(data).save();
    res.status(200).send(image);
  } catch (e) {
    res.send(e);
  }
});

/**
 * @route   PUT api/images/:id
 * @desc    Edit an image
 * @access  Public
 */
router.put('/:uid', async (req, res) => {
  const { uid } = req.params;
  const data = req.body;
  try {
    const image = await Image.findOneAndUpdate({ uid }, data, {
      new: true,
    });
    res.status(200).send(image);
  } catch (e) {
    res.send(e);
  }
});

/**
 * @route   Delete api/images/:id
 * @desc    Delete an image
 * @access  Public
*/
router.delete('/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const s3Response = await deleteImage(uid, res);
    if (s3Response.success) {
      const image = await Image.findOneAndRemove({ uid });
      res.status(200).send(image);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
