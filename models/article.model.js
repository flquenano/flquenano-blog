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
  user: mongoose.Types.ObjectId,
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
      },
      text: String
    }
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
      }
    }
  ],
  saved: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
      }
    }
  ],
  date_added: {
    type: Date,
    default: Date.now()
  }
});

articleSchema.pre(/^find/, function (next) {
  const query = [{}];
  this.populate({});
});

module.exports = mongoose.model("article", articleSchema);
