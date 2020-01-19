const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const cheerio = require('cheerio');
const chalk= require('chalk');
const logger = require('morgan');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require("passport");
const users = require("./routes/api/users");

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use("/",routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/libridex", {useNewUrlParser:true}, { useUnifiedTopology: true })
 .then(() => console.log(chalk.blue("MongoDB successfully connected @"+(process.env.MONGODB_URI || "mongodb://localhost/libridex"))))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);


app.listen(PORT, function() {
  console.log(`🌎  ==> API Server @ http://localhost:${PORT}`);
});

