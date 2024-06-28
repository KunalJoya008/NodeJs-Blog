const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Routes

router.get("/", async (req, res) => {
  const local = {
    title: "NODE-JS Blog",
    description: "This is a node js blog website",
  };

  try {
    const data = await Post.find();
    res.render("index", { local, data });
  } catch (error) {
    console.log(error);
  }
});



// get Post:id
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    const local = {
      title: data.title,
      description: "This is a node js blog website",
    };
    res.render("post", { local, data });
  } catch (error) {
    console.log(error);
  }
});

// search post route
router.post("/search", async (req, res) => {
  try {
    const local = {
      title: "Seach",
      description: "This is a node js blog website",
    };
    let searchTerm = req.body.searchTerm;

    // Ensure searchTerm is a string
    if (typeof searchTerm !== 'string') {
      searchTerm = '';
    }

    // Find posts that match the search term
    const data = await Post.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { body: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.render("search", {
      data,
      local,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

