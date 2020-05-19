const catchAsync = require("../utils/catchAsync.util");

exports.getCount = (Model) =>
  catchAsync(async (req, res) => {
    c;
    const doc = Model.aggregate([{ $count: "user" }]);
    res.status(200).json({
      status: "success",
      data: {
        cnt: res
      }
    });
  });
