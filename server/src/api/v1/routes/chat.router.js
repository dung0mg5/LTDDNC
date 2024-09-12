const router = require("express").Router();
const {
  accessChat,
  getChats,
  sendMessage,
  getMessages,
} = require("../controllers/chat.controller");
const { uploadFile } = require("../middlewares/multer");
const { requireAuth } = require("../middlewares/auth");
const { parseData } = require("../utils/helper");

router.post("/", requireAuth, parseData, accessChat);
router.get("/", requireAuth, getChats);
router.post("/:chatId/message", requireAuth, uploadFile, sendMessage);
router.get("/:chatId/message", requireAuth, getMessages);

module.exports = router;
