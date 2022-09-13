const mongoose = require("mongoose");
const { Schema } = mongoose;

const postingSchema = mongoose.Schema({
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
  user: [],
});

module.exports = mongoose.model("post", postingSchema);
