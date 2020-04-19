const express = require("express");
const { upload } = require("../utils/multer.util");
// const multer = require("multer");
// const crypto = require("crypto");
const router = express.Router();
const uploadFile = upload("./uploads/banner");
//const upload = multer({ dest: "assets/img/uploads/" });

const { create_article } = require("../controllers/article.controller");

// let upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./uploads/banner");
//     },
//     filename: (req, file, cb) => {
//       let customFileName = crypto.randomBytes(18).toString("hex"),
//         fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
//       cb(null, customFileName + "." + fileExtension);
//     }
//   })
// });

router.post("/", uploadFile.single("image_banner"), create_article);

module.exports = router;
