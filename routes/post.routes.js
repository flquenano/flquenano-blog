const express = require("express");
const router = express.Router();

const { protect } = require("../controllers/auth.controller");

const { upload } = require("../utils/multer.util");
const uploadFile = upload("banner/", 1024 * 1024 * 2); // 2MB

const {
  get_post,
  get_posts,
  get_my_posts,
  search_post,
  create_post,
  edit_posts,
  delete_post
} = require("../controllers/post.controller");

router.get("/search", protect, search_post);
router.get("/my-posts", protect, get_my_posts);

router
  .route("/:id")
  .get(get_post)
  .patch(protect, uploadFile.single("image_banner"), edit_posts)
  .delete(protect, delete_post);

router
  .route("/")
  .get(get_posts)
  .post(protect, uploadFile.single("image_banner"), create_post);

module.exports = router;
