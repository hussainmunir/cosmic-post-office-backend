const mongoose = require("mongoose");
const { Schema } = mongoose;

const postingSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
  },

  date: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
    unique: true,
  },
  userImage: {
    type: String,
  },
  coordinate: {
    type: String,
  },
});

module.exports = mongoose.model("post", postingSchema);
