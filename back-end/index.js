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

const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { MeterProvider } = require('@opentelemetry/sdk-metrics-base');

// Add your port and startServer to the Prometheus options
const options = { port: 9464, startServer: true };
const exporter = new PrometheusExporter(options);

// Register the exporter
const meter = new MeterProvider({
  exporter,
  interval: 1000,
}).getMeter('demo-prometheus');

// Now, start recording data
const counter = meter.createCounter('count_database', {
  description: 'count database'
});

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
  counter.add(1, { service_name: "testservice" });
  counter.add(1, { service_name: "testservice", status: "success", path: "/" });
  counter.add(1, { service_name: "testservice", status: "failure", path: "/" });
  counter.add(1, { service_name: "testservice", status: "data not found", path: "/" });
  res.json({
    text: "HOME PAGE",
  });
});

app.post("/checktel", async (req, res) => {
  counter.add(1, { service_name: "testservice" });
  counter.add(1, { service_name: "testservice", status: "success", path: "/checktel" });
  counter.add(1, { service_name: "testservice", status: "failure", path: "/checktel" });
  counter.add(1, { service_name: "testservice", status: "data not found", path: "/checktel" });
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
  counter.add(1, { service_name: "testservice" });
  counter.add(1, { service_name: "testservice", status: "success", path: "/adddata" });
  counter.add(1, { service_name: "testservice", status: "failure", path: "/adddata" });
  counter.add(1, { service_name: "testservice", status: "data not found", path: "/adddata" });
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
  counter.add(1, { service_name: "testservice" });
  counter.add(1, { service_name: "testservice", status: "success", path: "/getotp" });
  counter.add(1, { service_name: "testservice", status: "failure", path: "/getotp" });
  counter.add(1, { service_name: "testservice", status: "data not found", path: "/getotp" });
  try {
    var val = Math.floor(1000 + Math.random() * 9000);
    res.send("" + val);

  }

  catch (error) {
    res.status(500).send(error);
  }
});

app.post("/checkotp", async (req, res) => {
  counter.add(1, { service_name: "testservice" });
  counter.add(1, { service_name: "testservice", status: "success", path: "/checkotp" });
  counter.add(1, { service_name: "testservice", status: "failure", path: "/checkotp" });
  counter.add(1, { service_name: "testservice", status: "data not found", path: "/checkotp" });
  try {
    let tels = req.body.tel;
    let otpp = req.body.otp;
    let status = false
    // console.log(req.body);

    const data = await otp.find({});
    // console.log(data);
    data.map((val) => { if (val.tel == tels && val.otp == otpp) { status = true }; })
    if (status) { res.send("true"); }
    else { res.send("false"); }

  }

  catch (error) {
    res.status(500).send(error);
  }
});
