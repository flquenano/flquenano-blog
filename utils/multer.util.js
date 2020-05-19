const multer = require("multer");
const multerS3 = require("multer-s3");
const crypto = require("crypto");

const AWS = require("aws-sdk");

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2"
});
console.log(process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_ACCESS_KEY_ID);

const s3 = new AWS.S3();

//(us-east-2
exports.upload = (path, maxSize) =>
  multer({
    filename: (req, file, cb) => {
      let customFileName = crypto.randomBytes(18).toString("hex"),
        fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
      cb(null, customFileName + "." + fileExtension);
    },
    storage: multerS3({
      s3: s3,
      bucket: "flquenano-blog-uploads",
      Key: function (req, file, cb) {
        console.log(file);
        cb(null, file.filename);
      }
    }),

    limits: { fileSize: maxSize }
  });

/*
storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path);
  }
*/
