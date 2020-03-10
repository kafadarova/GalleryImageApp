# gallery-app

Image gallery application is a responsive app built using Angular 8, NodeJS & MongoDB. It displays a list of images, uploads them to S3 and stores their references in MongoDB.

## Functionality  

The application offers the following functionalities:
  - list all of uploaded images
  - upload an image and add a description to it
  - search by description
  - change a description of already uploaded image

## Local installation
  1. Clone the repository `git clone https://github.com/kafadarova/GalleryImageApp.git`
  2. In the **root** directory run `npm install` to install server dependencies
  3. Navigate to **client** with `cd client/` and run `npm install` to install client dependencies
  4. You should create a `.env` file in the **root** directory with the following variables:
   - `DB_USERNAME` - your MongoDB username
   - `DB_PASSWORD`- your MongoDB password
   - `SECRET_ACCESS_KEY` - connect to your AWS connect and acesss the S3 bucket
   - `ACCESS_KEY_ID` - connect to your AWS connect and acesss the S3 bucket
   - `BUCKET_NAME` - your s3 bucket

  5. In **root** directory run `npm run dev`
  6. The app should be running on `localhost:4200`

  ------------------------------------  
## List of supported endpoints

  | Endpoint        | Method           | Description  |
  | ------------- |:-------------:| -----|
  | /api/api/images | GET | Fetch all images |
  | /api/api/images | POST | Upload new image |
  | /api/api/images/:uid | PUT | Edit an image |
  | /api/api/images/:uid | DELETE | Delete an image |
