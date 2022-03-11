const Comment = require("../Model/Comment");

const router = require("express").Router();

router.post("/addComment", async (req, res) => {
  const { content, blogId } = req.body;
  try {
    const newComment = new Comment({ content, blogId });
    const result = await newComment.save();
    res.json({ message: "comment added success", comment: result });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
