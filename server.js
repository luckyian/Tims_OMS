const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");


const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/tims_OMS',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

  app.use(require("./routes/api-routes.js"));
  app.use(require("./routes/html-routes.js"));


  app.listen(PORT, function() {
    // Log (server-side) when our server has started
      console.log("App running on port" + PORT);
  });