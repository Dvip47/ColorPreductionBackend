const mongoose = require("mongoose");
const Post = require("./betSchema");
const betHistory = new mongoose.Schema({
  betPeriod: {
    type: Number,
  },
  betColor: {
    type: String,
    require: true,
  },
  betDate: {
    type: Date,
    require: true,
  },
});

const History = mongoose.model("ColorHistory", betHistory);
module.exports = History;
