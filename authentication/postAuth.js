const postModel = require("../models/postingModel");

const addPostAuth = async (description, userId, date, title) => {
  if (!description || !date || !userId || !title) {
    throw Error("All fields must be filled");
  }

  // const userNameExists = await postModel.findOne({ userId });
  // if (userNameExists) {
  //   throw Error("UserName already in use");
  // }

  return;
};

module.exports = {
  addPostAuth,
};
