const { Schema, model } = require("mongoose");

const reactSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  type: {
    type: String,
    enum: [0,1,2,3],
  },
});

module.exports = model("React", reactSchema);
