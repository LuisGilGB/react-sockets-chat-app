const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_OR_KEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          reeject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_OR_KEY);
    return [true, uid];
  } catch (err) {
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  checkJWT,
};
