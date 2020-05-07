const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  size: String,
  date_added: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("uploads", uploadSchema);
