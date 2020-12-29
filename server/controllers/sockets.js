const User = require("../models/User");

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

module.exports = {
  setUserOnline,
  setUserOffline,
};
