const mongoose = require("mongoose");
const blogSchema = require("../Schema/blogSchema");


const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
