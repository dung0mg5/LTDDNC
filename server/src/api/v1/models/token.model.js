const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 6 * 60 * 60, // 6 hours
  },
});

module.exports = model("Token", tokenSchema);
