const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uid = require('uid');
const config = require('config');

const secretAccessKey = config.get('secretAccessKey');
const accessKeyId = config.get('accessKeyId');
const bucketName = config.get('bucketName');

// AWS Config
aws.config.update({
  secretAccessKey,
  accessKeyId,
  region: 'eu-central-1'
});

// S3 Instance
const s3 = new aws.S3();

// Generate unique image id
const imageUid = uid();

// Create Upload object
const uploadImage = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, imageUid);
    }
  })
});

// @TODO: extend model with image name
const deleteImage = async (imageName,res) => {
  const params = {
    Bucket: bucketName,
    Key: ''
  };
  try {
    const deletedImage = await s3.deleteObject(params);
    console.log(deletedImage);
  } catch (e) {
    console.log(e);
    return res.json({success: false, msg: e});
  }
//   s3.deleteObject(params, function (err, data) {
// 	if (err) {
// 		console.log(err);
// 		// return res.json({
// 		// 	success: false,
// 		// 	msg: err
// 		// });
// 	}
// });
// res.json({success: true, msg: 'Image deleted from S3'});
//console.log("success");
}

module.exports = {uploadImage, deleteImage};
