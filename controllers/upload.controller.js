const aws = require("aws-sdk");

const UploadModel = require("../models/upload.model");
const catchAsync = require("../utils/catchAsync.util");

exports.upload_file = catchAsync(async (req, res) => {
  console.log(req.file);

  const file = {
    user: "",
    filename: "",
    type: "",
    size: ""
  };

  // const doc = await UploadModel.create(file);

  res.status(200).json({
    status: 200,
    success: true,
    data: {
      link: `${process.env.IMG}images/${req.file.filename}`
    }
  });
});

// exports.getImgUrl = (key) =>
//   catchAsync(async (req, res) => {
//     const params = {
//       bucket: process.env.AWS_BUCKET,
//       key,
//       expires: 120
//     };
//     s3.g;
//   });
