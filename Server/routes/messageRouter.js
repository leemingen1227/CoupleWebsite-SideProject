const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const User = require("../models/user");
const Messages = require("../models/messages");

const messageRouter = express.Router();

messageRouter.use(bodyParser.json());

messageRouter.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    console.log(req.headers);
    try {
      let messages;
      let username = req.user._id;  
      messages = await Messages.find({ username });

      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
})
.post(cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
    console.log(req.body);
    const newMessage = new Messages(req.body);
    try {
      console.log(req.body);
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
});


messageRouter.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, async (req, res) => {
    try {
      const message = await Messages.findById(req.params.id);
      res.status(200).json(message);
    } catch (err) {
      res.status(500).json(err);
    }
})

module.exports = messageRouter;