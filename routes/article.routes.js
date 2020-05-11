const express = require("express");
const router = express.Router();

const { protect } = require("../controllers/auth.controller");

const { upload } = require("../utils/multer.util");
const uploadFile = upload("./uploads/banner", 1024 * 1024 * 2); // 2MB

const {
  create_article,
  get_article,
  get_article_list,
  edit_article,
  delete_article,
  add_comment,
  delete_comment,
  add_util,
  remove_util,
  get_all_util,
  get_my_articles
} = require("../controllers/article.controller");

router.get("/get_cnt", protect, get_my_articles);

router
  .route("/")
  .get(get_article_list)
  .post(protect, uploadFile.single("image_banner"), create_article);

router
  .route("/:id")
  .get(get_article)
  .patch(protect, uploadFile.single("image_banner"), edit_article)
  .delete(protect, delete_article);

router
  .route("/:id/comments")
  .post(protect, add_comment)
  .get(get_all_util("comments"));

router.delete("/:article/comments/:comment", protect, delete_comment);

router
  .route("/:id/like")
  .get(get_all_util("likes"))
  .patch(protect, add_util("likes"))
  .delete(protect, remove_util("likes"));

router
  .route("/:id/save")
  .get(protect, get_all_util("saved"))
  .patch(protect, add_util("saved"))
  .delete(protect, remove_util("saved"));

module.exports = router;
