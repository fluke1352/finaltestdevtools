const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    center: String,
    countvac : String,
    nametitle : String,
    sex : String,
    name : String,
    sername : String,
    birtdate : String,
    tel : String,
    address : String,
    provice : String,
    district: String,
    subdistrict: String,
    zipcode: String,
    date: String,
    time : String
  });

const info = mongoose.model("finals", schema);

module.exports = info;