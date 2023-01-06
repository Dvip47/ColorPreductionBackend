const express = require("express");
const router = express.Router();
const Post = require("../Modal/betSchema");
const ColorBet = require("../Modal/betSchema");
const History = require("../Modal/betHistory");
const ColorHistory = require("../Modal/betHistory");
const User = require("../Modal/userSchema");

require("../DB/db");

//betPoint
router.post("/colorbet", async (req, res) => {
  const { betMoney, betColor, betDate } = req.body;
  //   console.log(betMoney);
  if (!betMoney || !betColor || !betColor) {
    return res.json({ statuscode: 0, msg: "betmoney or color not chooses" });
  }
  try {
    const newPost = new Post({
      betMoney,
      betColor,
      betDate,
    });

    let x = await newPost.save();
    console.log(x);
    if (x) {
      return res.json({ statuscode: 1, msg: "betting success " });
    } else {
      return res.json({ statuscode: -1, msg: "server error " });
    }
  } catch (error) {
    console.log(error);
    return res.json({ statuscode: -1, msg: "try again " });
  }
});

router.post("/postBetHistory", async (req, res) => {
  const { betColor, betDate, betPeriod } = req.body;
  if (!betColor || !betPeriod) {
    return res.json({
      statuscode: 0,
      msg: "period or color not get",
    });
  }
  try {
    const a = new History({ betColor, betDate, betPeriod });
    let x = await a.save();
    if (x) {
      return res.json({ statuscode: 1, msg: "color save success " });
    } else {
      return res.json({ statuscode: -1, msg: "server error " });
    }
  } catch (error) {
    console.log(error);
  }
});

//User
router.post("/signup", async (req, res) => {
  const { Mobile, OTP, pass, cpass } = req.body;
  if (!Mobile || !OTP || !pass) {
    return res.json({ statuscode: 0, msg: "Fill All Feild" });
  }

  try {
    const MobileVerify = await User.findOne({ Mobile: Mobile });
    if (MobileVerify) {
      const OTPVerify = await User.findOne({ OTP: OTP });
      if (!OTPVerify) {
        return res.json({ statuscode: 0, msg: "OTP Not Match" });
      } else {
        const a = new User({ Mobile, pass, cpass });
        let x = await a.save();
        if (x) {
          return res.json({ statuscode: 1, msg: "Registation success " });
        } else {
          return res.json({ statuscode: -1, msg: "Registation Failed" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/generateOTP", async (req, res) => {
  const { Mobile } = req.body;
  if (!Mobile) {
    return res.json({ statuscode: 0, msg: " Failed Mobile Number" });
  }
  const MobileVerify = await User.findOne({ Mobile: Mobile });
  if (MobileVerify) {
    return res.json({ statuscode: 0, msg: "  Mobile Number already exists" });
  }
  try {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const a = new User({ Mobile, OTP });
    let x = a.save();
    console.log(x);

    return res.json({ statuscode: 1, OTP: OTP });
  } catch (error) {
    console.log(error);
  }
});

//sign in

router.post("/signin", async (req, res) => {
  const { Mobile, pass } = req.body;
  if (!Mobile || !pass) {
    return res.json({ statuscode: 0, msg: "Fill all required feild" });
  }

  try {
    const MobileVerify = await User.findOne({ Mobile: Mobile });

    if (MobileVerify) {
      if (pass !== pass) {
        return res.json({ statuscode: 0, msg: "Invalid Password" });
      }
      // SetCookies
      res.json({ statuscode: 1, msg: "user Sign in successfully" });
    } else {
      res.json({ statuscode: 0, msg: "Invalid email" });
    }
  } catch (error) {
    console.log(error);
  }
});

//Winner
router.get("/win", async (req, res) => {
  let data = await ColorBet.find({
    timestamp: { $gte: new Date().getTime() - 1000 * 60 },
  });
  return res.json({ statuscode: 1, msg: data });
});

router.get("/getBetHistory", async (req, res) => {
  let data = await ColorHistory.find({});
  return res.json({ statuscode: 1, msg: data });
});

router.get("/", async (req, res) => {
  res.json("Working");
});
module.exports = router;
