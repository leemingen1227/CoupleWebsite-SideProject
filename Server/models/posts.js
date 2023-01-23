const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

var Posts = mongoose.model('Post', PostSchema);

module.exports = Posts;