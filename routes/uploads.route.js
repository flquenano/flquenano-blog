const express = require("express");
const router = express.Router();

const { upload } = require("../utils/multer.util");
const uploadFile = upload("./uploads/images", 1024 * 1024 * 2);

const { upload_file } = require("../controllers/upload.controller");

router.post("/article", uploadFile.single("image"), upload_file);

module.exports = router;
