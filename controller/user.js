const User = require("../models/user");
const { signin, signup, createToken } = require("../authentication/userAuth");
const fs = require("fs");
const { uploadsImage } = require("../helper/testt");
const user = require("../models/user");
const { reset } = require("../helper/passwordReset");
////////////////
///.............................................
const userSignup = async (req, res) => {
  try {
    let { email, password, userImage, userName, coordinate } = req.body;
    // userImage = "";
    const hash = await signup(email, password, userName, coordinate);
    if (req.files) {
      let image = req.files.photo;
      const path = await uploadsImage(image);
      userImage = path;
    }
    // const userToken = createToken(user._id);
    await User.create({
      email,
      password: hash,
      userImage,
      userName,
      coordinate,
    });
    res
      .status(200)
      .json({ message: "Registration Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
    // console.log(error);
  }
};

////user login ..................
const userSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await signin(email, password);

    //create token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "Login Successfull", user, token, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
    console.log(error);
  }
};

// get all user..........................
const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({ allUser, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};

//get a single user by id,,,,,,,,,,,,,,,,,,,,,,,,
const getById = async (req, res) => {
  const { id } = req.params;
  // if (!Mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "no such user found" });
  // }
  const user = await User.findById(id);

  if (!user) {
    return res
      .status(404)
      .json({ error: "no such user found", success: false });
  }
  return res.status(200).json({ user, success: true });
};

//delete user by Id
const userDelete = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const user = await User.findOneAndDelete({ _id: id });
  // console.log(user);
  if (!user) {
    return res
      .status(404)
      .json({ error: "no such user found", success: false });
  }
  if (req.files) {
    fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${user.userImage}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  return res.status(200).json({ message: "Delete Successfull", success: true });
};

//update user ........................
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userCheck = await User.findById(id);
    let image = req.files ? req.files.photo : userCheck.userImage;
    if (!userCheck) {
      return res
        .status(400)
        .json({ error: "no such user found", success: false });
    }
    const change = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      coordinate: req.body.coordinate,
      userImage: userCheck.userImage,
    };
    if (req.files) {
      if (userCheck.userImage) {
        fs.unlink(
          `${process.env.FILE_UPLOAD_PATH}/${userCheck.userImage}`,
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
      const path = await uploadsImage(image);

      change.userImage = path;
    }
    const post = await User.findByIdAndUpdate(id, change, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Update Successfull", post, success: true });
  } catch (error) {
    res.status(404).json({ error: error.message, success: false });
    // console.log(error);
  }
};

const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;

    const resetpassword = await reset(email, password);

    res
      .status(200)
      .json({ message: "Password Reset Successfull", success: true });
  } catch (error) {
    return res.status(404).json({ error: error.message, success: false });
    // console.log(error);
  }
};

module.exports = {
  userSignup,
  userSignin,
  userDelete,
  getById,
  getAllUser,
  updateUser,
  passwordReset,
};
