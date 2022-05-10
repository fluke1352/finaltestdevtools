const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    tel: String,
    otp: String
  });

const otp = mongoose.model("otps", schema);

module.exports = otp;