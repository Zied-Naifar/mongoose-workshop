const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const assert = require("assert");
const MongoUrl = "mongodb://localhost:27017/ContactsList";
const Contact = require("./routes/Contact");

app.use(bodyParser.json());

mongoose
  .connect(MongoUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(Contact);

app.listen(5000, err => {
  if (err) console.log("connection to server failed");
  console.log("connected on port 5000");
});
