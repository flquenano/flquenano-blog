const express = require("express");
const router = express.Router();

const { upload } = require("../utils/multer.util");
const uploadFile = upload("posts/", 1024 * 1024 * 2);

const { upload_file } = require("../controllers/upload.controller");

router.post("/img", uploadFile.single("image"), upload_file);

module.exports = router;
