const { Schema, model } = require("mongoose");

const connectionSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: Number,
      enums: [
        1, // requested
        2, // pending
        3, // friends
      ],
      required: true,
    },

    note: String,
  },
  {
    timestamps: true,
  },
);

module.exports = model("Connection", connectionSchema);
