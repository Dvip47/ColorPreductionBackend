const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Mobile: {
    type: Number,
    require: true,
  },
  Name: {
    type: String,
    require: true,
  },
  OTP: {
    type: Number,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
  cpass: {
    type: String,
    require: true,
  },
  Balance: {
    type: Number,
    require: true,
  },
  AcountNumber: {
    type: Number,
    require: true,
  },
  BankName: {
    type: String,
    require: true,
  },
  IFSC: {
    type: Number,
    require: true,
  },
  BankAddress: {
    type: String,
    require: true,
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
