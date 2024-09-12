const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("../../../../config/cloud");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");

const accessChat = catchAsync(async (req, res, next) => {
  let { users } = req.body;
  const { isGroupChat } = req.query;

  users = [req.user.authenticatedUser._id, ...users];

  let chat = await Chat.findOne({
    users: { $all: users },
    isGroupChat,
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("owner", "-password");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "-password",
  });
  if (chat) return res.json({ data: chat });
  else {
    if (isGroupChat) {
      if (users.length < 3)
        return next(new AppError("Group chat must have at least 2 users", 400));
    } else if (users.length !== 2)
      return next(new AppError("Private chat have only 2 users", 400));

    await Chat.create({
      users: users,
      isGroupChat,
      owner: req.user.authenticatedUser._id,
    });

    res.json({ message: "Create chat successfully" });
  }
});

const getChats = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;
  const chat = await Chat.find({
    users: { $elemMatch: { $eq: req.user.authenticatedUser._id } },
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  chat.forEach((c) => {
    const filterUser = c.users.filter(
      (user) => String(user._id) !== String(req.user.authenticatedUser._id),
    );

    if (filterUser.length === 1) {
      c.nameChat = filterUser[0].fullName;
      c.avatarChat = [filterUser[0].avatar.url];
    } else if (filterUser.length === 2) {
      c.nameChat = filterUser.map((user) => user.fullName).join(" and ");
      c.avatarChat = [filterUser[0].avatar.url, filterUser[1].avatar.url];
    } else if (filterUser.length > 2) {
      c.nameChat = `${filterUser[0].fullName} and ${filterUser[1].fullName} and ${filterUser.length - 2} others`;
      const endpoint =
        filterUser.length - 2 < 10
          ? `+${filterUser.length - 2}`
          : `${String(filterUser.length - 2)[0]}+${String(filterUser.length - 2)[1]}`;
      c.avatarChat = [
        filterUser[0].avatar.url,
        filterUser[1].avatar.url,
        `https://ui-avatars.com/api/?name=${endpoint}`,
      ];
    }
  });

  res.json({ data: chat });
});

const sendMessage = catchAsync(async (req, res, next) => {
  const { file } = req;
  const { chatId } = req.params;
  const { content } = req.body;
  if (!content) return next(new AppError("Content is required", 400));

  const existingChat = await Chat.findById(chatId);
  if (!existingChat) return next(new AppError("Chat not found", 404));

  const checkUser = existingChat.users.some(
    (user) => String(user) === String(req.user.authenticatedUser._id),
  );
  if (!checkUser) return next(new AppError("You are not in this chat", 403));

  const newMessage = new Message({
    sender: req.user.authenticatedUser._id,
    content,
    chat: chatId,
  });

  if (file) {
    const options = {
      folder: "messages",
      resource_type: "auto",
    };
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path,
      options,
    );

    newMessage.media = {
      url,
      public_id,
      resource_type: file.mimetype.startsWith("image") ? "image" : "video",
    };
  }

  let message = await newMessage.save();
  message = await User.populate(newMessage, {
    path: "sender",
    select: "-password",
  });
  message = await Chat.populate(newMessage, {
    path: "chat",
  });

  existingChat.latestMessage = message._id;
  await existingChat.save();

  res.json({ data: message });
});

const getMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { page, limit } = req.query;

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "-password")
    .sort({ createdAt: 1 });

  res.json({ data: messages });
});

module.exports = {
  accessChat,
  getChats,
  sendMessage,
  getMessages,
};
