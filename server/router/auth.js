/* 
  path: api/login
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { registerNewUser, renewToken, login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post(
  "/register",
  [
    check("name", "The name is required").isString().notEmpty(),
    check("password", "The password is required").notEmpty(),
    check("password", "The password must be a string").isString(),
    check("email", "The email is required").isEmail(),
    validateFields,
  ],
  registerNewUser
);

router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").notEmpty(),
    validateFields,
  ],
  login
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
