const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },

    visibility: {
      type: String,
      enum: ["Anyone", "Connections only"],
      default: "Anyone",
    },

    commentControl: {
      type: String,
      enum: ["Anyone", "Connections only", "No one"],
      default: "Anyone",
    },

    media: {
      type: Object,
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      resource_type: {
        type: String,
        required: true,
      },
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Post", postSchema);
