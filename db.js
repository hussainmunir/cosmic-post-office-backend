const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017";

const connectDB = async (req , res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected:`);
  } catch (error) {
   return res.status(400).json({ error: error.message, success: false });
  }
};

module.exports = connectDB;
