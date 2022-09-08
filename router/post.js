const express = require("express");
const checkAuth = require("../middlerWare/checkAuth");

const {
  getPostById,
  getAllPost,
  addPost,
  updatePost,
  postDelete,
} = require("../controller/postController");
const router = express.Router();

router.post("/add", checkAuth, addPost);
router.get("/get/:id", checkAuth, getPostById);
router.get("/allpost", checkAuth, getAllPost);
router.put("/update/:id", checkAuth, updatePost);
router.delete("/delete/:id", checkAuth, postDelete);

module.exports = router;
