const mongoose = require("mongoose");
const betSchema = new mongoose.Schema({
  betMoney: {
    type: Number,
    require: true,
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

const Post = mongoose.model("ColorBet", betSchema);
module.exports = Post;
