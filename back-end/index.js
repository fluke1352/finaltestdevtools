const express = require("express");
const tel = require("./models/tel.model")
const info = require("./models/model")
const otp = require("./models/otp.model")
var cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
const mongoose = require("mongoose");
const database = require("./database/database");

mongoose.Promise = global.Promise;
mongoose.connect(database.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  console.error("Something went wrong in mongodb %s", configs.mongouri);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


app.get("/", (req, res) => {
  res.json({
    text: "HOME PAGE",
  });
});

app.post("/checktel", async (req, res) => {

  try {
    let tels = req.body.tel;
    let status = false
    console.log(tels);

    const data = await tel.find({});
    data.map((val) => { if (val.tel == tels) { status = true }; })
    // res.send(data);
    if (status) {

      var val = Math.floor(1000 + Math.random() * 9000);
      const check = new otp({ "tel": tels, "otp": val })
      await check.save()
      res.send("true");

    }
    else { res.send("false"); }

  }

  catch (error) {
    res.status(500).send(error);
  }
});

app.post("/adddata", async (req, res) => {
  try {
    let infos = req.body
    const addData = new info(infos)
    // console.log(req.body);
    await addData.save()
    res.send("added");

  }

  catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getotp", async (req, res) => {
  try {
    var val = Math.floor(1000 + Math.random() * 9000);
    res.send("" + val);

  }

  catch (error) {
    res.status(500).send(error);
  }
});

app.post("/checkotp", async (req, res) => {
  try {
    let tels = req.body.tel;
    let otpp = req.body.otp;
    let status = false
    console.log(tels);

    const data = await otp.find({});
    console.log(data);
    data.map((val) => { if (val.tel == tels && val.otp == otpp) { status = true }; })
    if(status){res.send("true");}
    else{res.send("false");}

  }

  catch (error) {
    res.status(500).send(error);
  }
});
