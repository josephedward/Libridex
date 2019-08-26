const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const _ = require('lodash');
const cheerio = require('cheerio');
const chalk= require('chalk');
const logger = require('morgan');
const routes = require("./routes");
// const lbdx =require("./libridexer");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(logger('dev'));
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use("/",routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/libridex");

// console.log("this is the database"+process.env.MONGODB_URI || "mongodb://localhost/libridex");


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server @ http://localhost:${PORT}`);
});

