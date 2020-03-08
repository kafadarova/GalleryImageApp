module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-sarsp.mongodb.net/gallery?retryWrites=true&w=majority`,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  bucketName: process.env.BUCKET_NAME
};
