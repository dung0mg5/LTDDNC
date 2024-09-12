const { Schema, model } = require("mongoose");

const communitySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
    },

    banner: {
      type: Object,
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    bannedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    rules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rule",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model("Community", communitySchema);
