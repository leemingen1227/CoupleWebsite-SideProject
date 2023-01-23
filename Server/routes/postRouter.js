const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const User = require("../models/user");
const Post = require("../models/posts");

const postRouter = express.Router();

postRouter.use(bodyParser.json());

postRouter.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    console.log(req.headers);
    try {
      let posts;
      let username = req.user._id;  
      posts = await Post.find({ username });

      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
})
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    req.body.username = req.user._id;
    console.log(req.body);
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});


postRouter.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
})
.put(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(req.headers);
      console.log(post.username);
      console.log(req.user._id);
      if (post.username.equals(req.user._id)) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
})
.delete(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username.equals(req.user._id)) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = postRouter;