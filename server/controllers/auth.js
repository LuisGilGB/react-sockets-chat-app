const { response } = require("express");

const registerNewUser = async (req, res = response) => {
  res.json({
    success: true,
    message: "New user registration done",
    user: {},
  });
};

const login = async (req, res = response) => {
  res.json({
    success: true,
    message: "User logged in",
    user: {},
  });
};

const renewToken = async (req, res = response) => {
  res.json({
    success: true,
    message: "Validated new token",
  });
};

module.exports = {
  registerNewUser,
  login,
  renewToken,
};
