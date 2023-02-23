const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Like", likeSchema);
