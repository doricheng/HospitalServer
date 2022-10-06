const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const patientRoute = require("./routes/patient-router");
const orderRoute = require("./routes/order-router");

dotenv.config();
app.use(require("cors")());

//connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(patientRoute);
app.use(orderRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});

module.exports = app;
