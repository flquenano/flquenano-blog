const multer = require("multer");
const ArticleModel = require("../models/article.model");
const catchAsync = require("../utils/catchAsync.util");

exports.create_article = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  // const article = {
  //   ...req.body,
  //   user: req.user.id
  // };

  // const doc = ArticleModel.create(article);
  // if (!doc) {
  //   return res.status(500).json({
  //     message: "Failed to create Article!"
  //   });
  // }

  res.status(201).json({
    message: "Article Created!"
  });
});

// {
//   "title": "",
//   "content": "",
//   "image_banner": ""
// }
