const { Router } = require("express");

const router = Router();

router.post("/register", (req, res) => {
  res.json({
    success: true,
    message: "New user registration done",
    user: {},
  });
});

router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "User logged in",
    user: {},
  });
});

router.get("/renew", (req, res) => {
  res.json({
    success: true,
    message: "Validated new token",
  });
});

module.exports = router;
