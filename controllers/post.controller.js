const PostModel = require("../models/post.model");
const catchAsync = require("../utils/catchAsync.util");
const APIFeatures = require("../utils/apiFeatures.util");

exports.create_post = catchAsync(async (req, res) => {
  let post = {
    title: req.body.title,
    content: req.body.content,
    user: req.user.id
  };
  if (req.file === undefined) {
    post = {
      ...post,
      image_banner: "f6703de376027ac6bdf16f7622b93e03d6f1.jpg"
    };
  } else {
    post = {
      ...post,
      image_banner: req.file.filename
    };
  }
  const doc = await PostModel.create(post);

  if (!doc) {
    return res.status(500).json({
      message: "Failed to create Post!"
    });
  }
  res.status(201).json({
    status: "success",
    id: doc.id
  });
});

exports.get_post = catchAsync(async (req, res) => {
  const doc = await PostModel.findById(req.params.id);
  res.status(200).json(doc);
});

exports.get_posts = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    PostModel.find(
      { active: true },
      { id: 1, title: 1, subtitle: 1, user: 1, date_added: 1 }
    ).populate({
      path: "user",
      select: "account_name"
    }),
    req.query
  )
    .paginate()
    .sort();
  const docs = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      posts: docs
    }
  });
});

exports.get_my_posts = catchAsync(async (req, res) => {
  console.log(req.user);
  const doc_cnt = await PostModel.find({ user: req.user._id, active: true });
  res.status(200).json({
    status: "success",
    data: {
      posts: doc_cnt
    }
  });
});

exports.search_post = catchAsync(async (req, res) => {
  const docs = await PostModel.find({
    user: req.user.id,
    title: { $regex: req.query.title },
    active: true
  });
  res.status(200).json({
    status: "success",
    data: {
      posts: docs
    }
  });
});

exports.edit_posts = catchAsync(async (req, res) => {
  if (req.file !== undefined) {
    req.body = {
      ...req.body,
      image_banner: req.file.filename
    };
  } else {
    delete req.body.image_banner;
  }

  const doc = await PostModel.findByIdAndUpdate(
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

exports.delete_post = catchAsync(async (req, res) => {
  const doc = await PostModel.findByIdAndUpdate(
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
