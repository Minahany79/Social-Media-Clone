const { getAllBlogs, add_blog } = require("../controller/blogController");
const isAuthoraized = require("../../../common/middelware/isAuthoraized");
const { GET_ALL_BLOGS, ADD_BLOG } = require("../endpoints");
const router = require("express").Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const uploads = multer({ storage });

router.get("/blogs",  getAllBlogs);
router.post(
  "/addBlogs",
  // isAuthoraized(ADD_BLOG),
  uploads.single("blogImage"),
  add_blog
);
// router.put("/updateBlog",uploads.single("blogImage") , (req,res)=>{


// })

module.exports = router;
