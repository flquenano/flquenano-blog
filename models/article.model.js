const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image_banner: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
      },
      body: String
    }
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
      }
    }
  ],
  saved: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
      }
    }
  ],
  active: {
    type: Boolean,
    select: false,
    default: true
  },
  date_added: {
    type: Date,
    default: Date.now()
  }
});

articleSchema.pre(/^find/, function (next) {
  const query = [
    { path: "user", select: "name id" },
    { path: "comments", select: "name id" },
    { path: "likes", select: "name id" },
    { path: "saved", select: "name id" }
  ];
  this.populate(query);
  next();
});

module.exports = mongoose.model("article", articleSchema);
