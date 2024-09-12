const { Schema, model } = require("mongoose");

const reportSchema = new Schema({});

module.exports = model("Report", reportSchema);
