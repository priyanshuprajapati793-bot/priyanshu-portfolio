const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contactController");

router.post("/contact", sendMessage);
router.get("/messages", getMessages);
router.delete("/messages/:id", deleteMessage);

module.exports = router;