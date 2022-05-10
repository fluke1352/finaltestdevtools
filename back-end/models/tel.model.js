const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    tel: String,
  });

const tel = mongoose.model("tels", schema);

module.exports = tel;