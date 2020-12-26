const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  try {
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        success: true,
        msg: "No token was provided",
      });
    }

    const tokenPayload = jwt.verify(token, process.env.JWT_OR_KEY);
    req.uid = tokenPayload.uid;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "The token is not valid",
    });
  }
};

module.exports = {
  validateJWT,
};
