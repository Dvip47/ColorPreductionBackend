const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/ColorGame";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful to DB");
  })
  .catch((err) => {
    console.log("Not connected to DB");
  });
