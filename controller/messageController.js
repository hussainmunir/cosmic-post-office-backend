const messageModel = require("../models/messageModel");
const { addMessgeAuth } = require("../authentication/messageAuth");

// add message

const addMessage = async (req, res) => {
  const { senderId, receiverId, senderName, receiverName, message, date } =
    req.body;

  try {
    await addMessgeAuth(senderId, receiverId, senderName, receiverName);
    const newMessge = await messageModel.create({
      senderId,
      receiverId,
      senderName,
      receiverName,
      message,
      date,
    });
    res
      .status(200)
      .json({ newMessge, Message: "message added ", success: true });
  } catch (error) {
    res.status(404).json({ error: error.message, success: false });
    // console.log(error);
  }
};

//   get all message....................
const getAllMesssage = async (req, res) => {
  try {
    const Message = await messageModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ Message, success: true });
  } catch (error) {
    res.status(404).json({ error: error.message, success: false });
  }
};

//   get by ID ......................
const getMessageByID = async (req, res) => {
  try {
    const { id } = req.params;
    const Message = await messageModel.findById(id);
    if (!Message) {
      res.status(400).json({ message: "message not found", success: false });
    } else {
      res.status(200).json({ Message, success: true });
    }
  } catch (error) {
    res.status(200).json({ error: error.message, success: false });
  }
};

// Delete message ....................
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const Message = await messageModel.findByIdAndDelete(id);
    if (!Message) {
      res.status(400).json({ message: "message not found", success: false });
    } else {
      res.status(200).json({ message: "deleted successfully", success: true });
    }
  } catch (error) {}
};

// update message .......................

const updateMessageByID = async (req, res) => {
  const { id } = req.params;
  const { senderId, senderName, receiverId, receiverName, message } = req.body;
  try {
    const Message = await messageModel.findById(id);
    if (!Message) {
      return res
        .status(400)
        .json({ response: "message not found", success: false });
    }

    const newMessage = {
      senderId,
      senderName,
      receiverId,
      receiverName,
      message,
    };

    const updatedMessage = await messageModel.findByIdAndUpdate(
      id,
      newMessage,
      { new: true }
    );
    return res.status(200).json({
      response: "message updated successfully",
      updatedMessage,
      success: true,
    });
  } catch (error) {}
};

module.exports = {
  getAllMesssage,
  addMessage,
  getMessageByID,
  deleteMessage,
  updateMessageByID,
};
