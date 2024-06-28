const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Cookie } = require("express-session");
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = require("../middlewares/auth");
const adminLayout = "../views/layouts/admin";

// admin - login page
router.get("/admin", async (req, res) => {
  try {
    const local = {
      title: "Admin",
      description: "This is a node js blog website",
    };
    res.render("admin/index", { local });
  } catch (error) {
    console.log(error);
  }
});

// check -login  {POST}
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

//GET - register
router.get('/register', async (req, res) => {
  try {
    const local = {
      title: 'Register',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    res.render('admin/register', {
      local,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});

// register  {POST}
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).redirect("/admin");
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

// dashboard route -- GET
router.get("/dashboard", authMiddleware, async (req, res) => {
 try {
  const local = {
    title: "Admin",
    description: "This is a node js blog website",
  };
  const data = await Post.find();
  res.render("admin/dashboard", { local, data, layout: adminLayout });
 } catch (error) {
  console.log(error)
 }
});

//Admin - Create New Post
router.get('/add-post', authMiddleware, async (req, res) => {
  try {
    const local = {
      title: 'Add Post',
      description: 'Simple Blog created with NodeJs, Express & MongoDb.'
    }

    const data = await Post.find();
    res.render('admin/add-post', {
      local,
      layout: adminLayout
    });

  } catch (error) {
    console.log(error);
  }

});


//  POST  Admin - Create New Post
router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body
      });

      await Post.create(newPost);
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
});

// GET /Admin - Create New Post
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
  try {

    const local = {
      title: "Edit Post",
      description: "Free NodeJs User Management System",
    };

    const data = await Post.findOne({ _id: req.params.id });

    res.render('admin/edit-post', {
      local,
      data,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error);
  }

});


// PUT / Admin - Create New Post
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
  try {

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });

    res.redirect(`/edit-post/${req.params.id}`);

  } catch (error) {
    console.log(error);
  }

});


// DELETE / Admin - Delete Post

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

  try {
    await Post.deleteOne( { _id: req.params.id } );
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }

});

// GET /Admin Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  //res.json({ message: 'Logout successful.'});
  res.redirect('/');
});



module.exports = router;
