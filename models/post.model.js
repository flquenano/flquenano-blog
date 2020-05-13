const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
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

// postSchema.pre(/^find/, function (next) {
//   const query = [
//     { path: "user", select: "name id" },
//     { path: "comments.user", select: "name id" },
//     { path: "likes.user", select: "name id" },
//     { path: "saved.user", select: "name id" }
//   ];
//   this.populate(query);
//   next();
// });

module.exports = mongoose.model("posts", postSchema);
