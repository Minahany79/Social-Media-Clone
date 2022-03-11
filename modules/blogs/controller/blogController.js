const Comment = require("../../Comments/Model/Comment");
const Blog = require("../Model/blogModel");

const getAllBlogs = async (req, res) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const blogs = await Blog.find({})
    .populate("createdBy", "name")
    .limit(limit)
    .skip(skip);

  // let blogArr = [];
  // let stream = await Blog.find({})
  //   .stream()
  //   .on("data", async function (doc) {
  //     try {
  //       const comments = await Comment.find({ blogId: doc._id });
  //       doc.comment = comments;
  //       blogArr = [...blogArr, doc];
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
  //   .on("end", () => {
  //     console.log(blogArr);
  //   });
  //   console.log(blogArr);


  const all = await Blog.countDocuments();
  const totalPages = Math.ceil(all / limit);
  res.json({ message: "All blogs", page, size, totalPages, data: blogs });
};

const add_blog = async (req, res) => {
  const { title, content, createdBy, blogImage } = req.body;
  console.log(req.file);
  const newBlog = new Blog({
    title,
    content,
    createdBy,
    blogImage: `http://localhost:5000/${req.file.path}`,
  });
  await newBlog.save();
  res.json({ message: "blog created success" });
};

module.exports = {
  getAllBlogs,
  add_blog,
};
