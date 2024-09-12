const { Schema, model } = require("mongoose");

const relationshipSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    following: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Relationship", relationshipSchema);
