const { Schema, model } = require("mongoose");

const chatSchema = Schema(
  {
    nameChat: String,
    avatarChat: [String],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

chatSchema.index({ nameChat: "text" });

module.exports = model("Chat", chatSchema);
