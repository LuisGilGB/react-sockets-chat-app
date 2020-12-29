const User = require("../models/User");
const { saveMessage } = require("./messages");

const setUserOnline = async (uid) => {
  const user = await User.findByIdAndUpdate(
    uid,
    { online: true },
    { new: true }
  );
  return user;
};

const setUserOffline = async (uid) => {
  const user = await User.findByIdAndUpdate(
    uid,
    { online: false },
    { new: true }
  );
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");
  return users;
};

const onChatMessageSent = async (payload) => {
  const { from, to, body } = payload;
  return await saveMessage({ from, to, body });
};

module.exports = {
  setUserOnline,
  setUserOffline,
  getUsers,
  onChatMessageSent,
};
