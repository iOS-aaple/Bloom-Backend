const router = require("express").Router();
const Post = require("../model/post");

router.get("/:id", async (req, res) => {
  try {
    const ownerID = req.params.id;
    const posts = await Post.find({ ownerID: ownerID });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/addNewPost", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      created_At: req.body.created_At,
      ownerID: req.body.ownerID,
      content: req.body.content,
    });

    post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await Post.findOneAndUpdate(
      { _id: userID },
      {
        title: req.body.title,
        created_At: req.body.created_At,
        ownerID: req.body.password,
        content: req.body.content,
      }
    );

    // await user.save();
    res.status(200).json("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.post("/:id", async (req, res) => {
  const user = await Post.findOne({ _id: req.params.id });
  user.remove();

  res.json("post deleted ");
});

module.exports = router;
