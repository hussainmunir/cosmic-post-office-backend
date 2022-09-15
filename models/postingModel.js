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
  },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

module.exports = mongoose.model("post", postingSchema);
