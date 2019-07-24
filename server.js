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


// lbdx.libridex();
// libridex = () => {
// let visitedLink;
// let book = {};
// function testNestedCalls(theCall){
//   theCall
//     .then(() => {
//       console.log((chalk.blue.bgYellow("API calls executed ")));
//       // console.trace();
//     })
//     .catch(e => {
//       console.log((chalk.red('callback error: ')) + e);
//       // console.trace();
//     });

// };

// getGenreLBVX = genre => {
//   console.log(chalk.green('contacting librivox'));
//   return axios.get(
//     `https://librivox.org/api/feed/audiobooks/genre/^${genre}?format=json`
//   );
// };

// getAuthorLBVX = author => {
//   console.log(chalk.green('contacting librivox'));
//   return axios.get(
//     `https://librivox.org/api/feed/audiobooks/author/^${author}?format=json`
//   );
// };

// //just returns first 17
// getAllLBVX = () => {
//   console.log(chalk.green('contacting librivox'));
//   return axios.get(
//     'https://librivox.org/api/feed/audiobooks/title/^all?format=json'
//   );
// };


// //SINGLE URL
// getRequestURL = lbvxRequest => {
//   console.log(chalk.green('finding 1 URL from Response'));
//   return (lbvx_URL = lbvxRequest.then(res => {
//     let lbvx_URL;
//     wholeResponse = _.toArray(res.data.books);
//     // console.log([wholeResponse]);
//     // wholeResponse.forEach(element => lbvx_URLs.push(element.url_librivox));
//     let randIndex= Math.floor(Math.random() * (wholeResponse.length+1));
//     console.log(randIndex);
//     lbvx_URL=wholeResponse[randIndex].url_librivox;
//     console.log(lbvx_URL);
//     return lbvx_URL;
//   }));
// };



// getBookPage = requestURL => {
//   console.log(chalk.green('Fetching page content from URL'));
//   return (bookPage = requestURL.then(page => {
//     axios.get(page).then(
//         res =>
//           {
//         playRandomChapter(buildBookObj(res))}
//       );
//   }));
// };



// //build book object
// //then send to mongo
// //SINGLE BOOK
// function buildBookObj(pages) {
//   console.log(chalk.green('building book object'));
//   let $ = cheerio.load(pages.data);
  
//   book.bkTitle = $('.book-page-book-cover')
//     .next('h1')
//     .text();
//   book.bkAuthor = $('.book-page-author').text();
//   book.bkDescription=$('.description').text();
//   book.CHS = [];
//   $('.chapter-name').each(function(i, element) {
//     let chapter = {};
//     chapter.chTitle = $(element).text();
//     chapter.chLink = $(element).attr('href');
//     book.CHS.push(chapter);
//   });
//   randomBook=book;
//   return book;
// }


// playRandomChapter =(book)=>
// {
//   let randIndex= Math.floor(Math.random() * (book.CHS.length));
//   let playedCh=book.CHS[randIndex];
//   console.log(playedCh.chLink);
//   visitedLink=playedCh.chLink;
//   return playedCh.chLink;
// }

// testLBVX=()=>{
// testNestedCalls(getBookPage(getRequestURL(getAllLBVX())));
// }

// searchGenre=(genre)=>{
//   testNestedCalls(getBookPage(getRequestURL(getGenreLBVX(genre))))
// }

// searchAuthor=(author)=>{
//   testNestedCalls(getBookPage(getRequestURL(getAuthorLBVX(author))))
// }




// // const express = require("express");
// // const app = express();
// // const portLBVX = process.env.portLBVX || 9999;
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// // app.use(express.static('public'));


// testLBVX();


// // Need to send whole damn book obj but this is ok for now
// app.get('/audiobook', function (req, res, next) { 
//   res.send(book);
// });







// libridex();
/*

// let theLink=LBDX.visitedLink;
// console.log("HERE IS THE LINK \n"+lbdx.visitedLitnk);
 
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.post('/', function (req, res, next) { 
 
//   // res.send(book);
// });


// Start the API server
// app.listen(portLBVX, function() {
//   console.log(`🌎  ==> Librivox Server:  http://localhost:${portLBVX}`);
// });


*/


