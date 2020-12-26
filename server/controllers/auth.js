const { response } = require("express");

const registerNewUser = async (req, res = response) => {
  res.json({
    success: true,
    msg: "New user registration done",
    user: {},
  });
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  res.json({
    success: true,
    msg: "User logged in",
    user: {
      email,
    },
  });
};

const renewToken = async (req, res = response) => {
  res.json({
    success: true,
    msg: "Validated new token",
  });
};

module.exports = {
  registerNewUser,
  login,
  renewToken,
};
