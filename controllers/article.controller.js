const ArticleModel = require("../models/article.model");
const catchAsync = require("../utils/catchAsync.util");

const { upload } = require("../utils/multer.util");

exports.create_article = catchAsync(async (req, res) => {
  const article = {
    title: req.body.title,
    content: req.body.content,
    image_banner: req.file.filename,
    user: req.user.id
  };
  // console.log(req.body);
  // console.log(req.file);
  // console.log(req.user);
  const doc = await ArticleModel.create(article);

  if (!doc) {
    return res.status(500).json({
      message: "Failed to create Article!"
    });
  }
  res.status(201).json({
    status: "success",
    id: doc.id
  });
});

exports.get_article = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const doc = await ArticleModel.findById(req.params.id);
  res.status(200).json(doc);
});

exports.get_article_list = catchAsync(async (req, res) => {
  const docs = await ArticleModel.find({});
});

exports.edit_article = catchAsync(async (req, res) => {
  if (req.file) {
    req.body = {
      ...req.body,
      image_banner: req.file.filename
    };
  }

  const doc = await ArticleModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!doc) {
    return res.status(500).json({
      status: "Failed"
    });
  }
  res.status(200).json(doc);
});

exports.delete_article = catchAsync(async (req, res) => {
  const doc = await ArticleModel.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!doc) {
    return res.status(500).json({
      status: "Failed"
    });
  }

  res.status(200).json({
    status: "success"
  });
});

exports.add_comment = catchAsync(async (req, res) => {
  req.body = {
    ...req.body,
    user: req.user.id
  };

  const doc = await ArticleModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: req.body
      }
    },
    { new: true }
  );

  console.log(doc);
  if (!doc) {
    return res.status(500).json({
      status: "Failed"
    });
  }

  res.status(201).json({
    message: "Comment Added!"
  });
});

exports.delete_comment = catchAsync(async (req, res) => {
  const doc = await ArticleModel.findByIdAndUpdate(
    req.params.article,
    {
      $pull: { "comments.id": req.params.comment }
    },
    { new: true }
  );
  if (!doc) {
    return res.status(500).json({
      status: "Failed"
    });
  }
  res.status(200).send();
});

exports.add_util = (field) =>
  catchAsync(async (req, res) => {
    const fieldId = `${field}.user`;
    const check = await ArticleModel.find({ [fieldId]: req.user.id });

    if (check.length > 0) {
      return res.status(400).json({ message: `Already ${field} the article!` });
    }

    const doc = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          [field]: {
            user: req.user.id
          }
        }
      },
      {
        new: true
      }
    );

    if (!doc) {
      return res.status(500).send();
    }

    res.status(200).send();
  });

exports.get_all_util = (field) =>
  catchAsync(async (req, res) => {
    const fieldId = `${field}.user`;
    const docs = await ArticleModel.findOne(
      { _id: req.params.id },
      { [field]: 1 }
    ).populate({
      path: fieldId,
      select: "name id"
    });
    console.log(docs);
    res.status(200).json({ [field]: docs[field] });
  });

exports.remove_util = (field) =>
  catchAsync(async (req, res) => {
    const doc = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          [field]: {
            user: req.user.id
          }
        }
      },
      {
        new: true
      }
    );

    if (!doc) {
      return res.status(500).send();
    }

    res.status(200).send();
  });

// {
//   "title": "",
//   "content": "",
//   "image_banner": ""
// }
