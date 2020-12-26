const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const registerNewUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const emailAlreadyRegistered = await User.findOne({ email });
    if (emailAlreadyRegistered) {
      return res.status(400).json({
        success: false,
        msg: "The provided email is already registered",
      });
    }

    // Create a new user
    const user = await new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save new user in the database
    await user.save();

    // Generate token
    const token = await generateJWT(user.id);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Please, contact with the administrator",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "The login data is not correct",
      });
    }

    const isValidPassword = bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        msg: "Th login data is not correct",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Please, contact with the administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  try {
    const { uid } = req;

    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Please, contact with the administrator",
    });
  }
};

module.exports = {
  registerNewUser,
  login,
  renewToken,
};
