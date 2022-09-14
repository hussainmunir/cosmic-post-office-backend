const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  senderId: {
    type: Number,
    required: true,
  },

  receiverId: {
    type: Number,
    required: true,
  },
  senderName: {
    type: String,
  },
  receiverName: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("message", messageSchema);
