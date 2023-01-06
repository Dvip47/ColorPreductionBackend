const express = require("express");
const app = express();
require("./DB/db");
const routes = require("./routes/route");
app.use(express.json());
app.use(routes);
var cors = require("cors");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS"
  ),
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.get("*", (req, res) => {
  res.send("error 404");
});
app.listen(8000, () => {
  console.log(` Connected at ${"http://localhost:8000"}`);
});
