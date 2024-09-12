const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const emailTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    // required: true,
  },
  for: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 1800, // 30 minutes
  },
});

emailTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
  next();
});

emailTokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  return result;
};

module.exports = model("EmailToken", emailTokenSchema);
