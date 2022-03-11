const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
