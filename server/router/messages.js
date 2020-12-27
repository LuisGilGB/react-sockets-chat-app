/* 
  /api/messages
*/
const { Router } = require("express");
const { getMessagesFromUser } = require("../controllers/messages");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get("/:from", validateJWT, getMessagesFromUser);

module.exports = router;
