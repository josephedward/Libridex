const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const cheerio = require('cheerio');
const chalk= require('chalk');
const logger = require('morgan');
const { join } = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


require('dotenv').config();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use("/",routes);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/libridex",
 [{useNewUrlParser:true},  {useUnifiedTopology: true}] 
 )
 .then(() => console.log(chalk.blue("MongoDB successfully connected @"+(process.env.MONGODB_URI || "mongodb://localhost/libridex"))))
  .catch(err => console.log(err));


app.use(express.static(join(__dirname, "build")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});


app.listen(PORT, function() {
  console.log(`🌎  ==> API Server @ http://localhost:${PORT}`);
});

