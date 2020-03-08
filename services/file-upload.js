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
  region: 'eu-central-1',
});

// S3 Instance
const s3 = new aws.S3();

// Generate unique image id
const imageUid = uid();

// Delete image
const deleteImage = async (uid, res) => {
  const params = {
    Bucket: bucketName,
    Key: uid,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      return res.json({
      	success: false,
      	msg: err,
      });
    }
  });
  return { success: true };
};

// Create Upload object
const uploadImage = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, imageUid);
    },
  }),
});

module.exports = { deleteImage, uploadImage };
