const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const MessageSchema = new Schema(
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
    author: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

var Messages = mongoose.model('Message', MessageSchema);

module.exports = Messages;
