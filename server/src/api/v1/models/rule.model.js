const { Schema, model } = require("mongoose");

const ruleSchema = new Schema({
  rule: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("Rule", ruleSchema);
