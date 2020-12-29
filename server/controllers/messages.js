const { response } = require("express");
const Message = require("../models/Message");

const getMessagesFromUser = async (req, res = response) => {
  const userId = req.uid;
  const { from } = req.params;

  try {
    const last30Messages = await Message.find({
      $or: [
        { from: userId, to: from },
        { from, to: userId },
      ],
    })
      .sort({ createdAt: "desc" })
      .limit(30);

    res.json({
      success: true,
      messages: last30Messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Please, contact with the administrator",
    });
  }
};

const saveMessage = async (message) => {
  try {
    const newMessage = await new Message(message);
    await newMessage.save();
    return newMessage;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  getMessagesFromUser,
  saveMessage,
};
