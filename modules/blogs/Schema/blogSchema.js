const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    blogImage: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = blogSchema;
