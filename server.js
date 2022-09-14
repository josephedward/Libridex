// const express = require("express");
// const logger = require('morgan');
// const { join } = require("path");
// const routes = require("./service/api");
// const app = express();
// const PORT = process.env.PORT || 3001;
// require('dotenv').config();

// app.use(logger('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// app.use("/",routes);

// // app.use(express.static(join(__dirname, "build")));

// app.use((_, res) => {
//   res.sendFile(join(__dirname, "build", "index.html"));
// });

// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server @ http://localhost:${PORT}`);
// });
