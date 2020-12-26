/* 
    path: api/login
 */
const { Router } = require("express");
const { registerNewUser, renewToken, login } = require("../controllers/auth");

const router = Router();

router.post("/register", registerNewUser);

router.post("/", login);

router.get("/renew", renewToken);

module.exports = router;
