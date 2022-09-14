const express = require("express");
const router = express.Router();
const checkAuth = require("../middlerWare/checkAuth");


const {
  addMessage,
  getAllMesssage,
  getMessageByID,
  deleteMessage,
  updateMessageByID,
} = require("../controller/messageController");

router.post("/add",checkAuth, addMessage);
router.get("/all",checkAuth, getAllMesssage);
router.get("/get/:id",checkAuth, getMessageByID);
router.delete("/delete/:id",checkAuth, deleteMessage);
router.put("/update/:id",checkAuth, updateMessageByID);

module.exports = router;
