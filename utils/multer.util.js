const multer = require("multer");
const crypto = require("crypto");

exports.upload = (path, maxSize) =>
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: (req, file, cb) => {
        let customFileName = crypto.randomBytes(18).toString("hex"),
          fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
        cb(null, customFileName + "." + fileExtension);
      },
      limits: { fileSize: maxSize }
    })
  });
