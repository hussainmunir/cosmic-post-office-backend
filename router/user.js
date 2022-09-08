const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const checkAuth = require("../middlerWare/checkAuth");

const {
  userSignin,
  userSignup,
  userDelete,
  getById,
  getAllUser,
  updateUser,
  passwordReset,
} = require("../controller/user");

router.post("/register", userSignup);
router.post("/login", userSignin);
router.delete("/delete/:id", checkAuth, userDelete);
router.get("/:id", checkAuth, getById);
router.get("/", checkAuth, getAllUser);
router.put("/update/:id", checkAuth, updateUser);
router.put("/reset", passwordReset);

module.exports = router;
