import axios from "axios";
// const axios = require("axios");
const _ = require("lodash");
const cheerio = require("cheerio");
const chalk = require("chalk");
// const router = require("express").Router();
const csv = require("csvtojson");
// const fs = require("fs");
// const Papa = require("papaparse");
// const httpRequest = require("request-promise");

let book = {};
const csvFilePath = "./data/denormalized_scrape_match_v3-3.csv";
// const path = require("path");
// const router = require("express").Router();
const lbvx = require("./book-scrape");

function cors(method, url) {
  return axios({
    method: method,
    url: "https://corsproxy.io/?" + encodeURIComponent(url),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });
}

//var csv is the CSV file with headers
// function csvJSON(csv) {
//   var lines = csv.split("\n");
//   var result = [];
//   // NOTE: If your columns contain commas in their values, you'll need
//   // to deal with those before doing the next step
//   // (you might convert them to &&& or something, then covert them back later)
//   // jsfiddle showing the issue https://jsfiddle.net/
//   var headers = lines[0].split(",");
//   for (var i = 1; i < lines.length; i++) {
//     var obj = {};
//     var currentline = lines[i].split(",");
//     for (var j = 0; j < headers.length; j++) {
//       obj[headers[j]] = currentline[j];
//     }
//     result.push(obj);
//   }

//   //return result; //JavaScript object
//   return JSON.stringify(result); //JSON
//   // return result;
// }
// const CSVToJSON = csv => {
//   const lines = csv.split('\n');
//   const keys = lines[0].split(',');
//   return lines.slice(1).map(line => {
//       return line.split(',').reduce((acc, cur, i) => {
//           const toAdd = {};
//           toAdd[keys[i]] = cur;
//           return { ...acc, ...toAdd };
//       }, {});
//   });
// };

async function findBookRecs(bookTitle) {
  // const csvText =  await axios.get('../data/denormalized_scrape_match_v3-3.csv');
  // console.log(csvText);
  // const file = fs.createReadStream('../data/denormalized_scrape_match_v3-3.csv');
  let recommendations = await csv().fromFile(csvFilePath);
  // // await csv().fromFile(file);
  // Papa.parse(csvFilePath, {}).data
  // // await csv().fromFile(file);
  // // CSVToJSON(csvFilePath);
  console.log(recommendations);


  //CHANGE THIS BACK 
  console.log(chalk.bgGreen("searching recommendations for : ", "Count of Monte Cristo"));
  try {
    let rec_list = [];
    let data = JSON.parse(JSON.stringify(recommendations));
    for (var x of data) {
      let tempObj = JSON.parse(x[0]);
      // console.log(tempObj[0].title);
      if (
        bookTitle.includes(tempObj[0].title) ||
        tempObj[0].title.includes(bookTitle) ||
        tempObj[0].title == bookTitle
      ) {
        console.log("found it:");
        // console.log(tempObj[0].description)
        console.log(tempObj[0].img_url);
        // console.log("recommendations: ");
        // console.log(JSON.parse(tempObj[0].Rec_Info_Arr));
        let tempRecArr = JSON.parse(tempObj[0].Rec_Info_Arr);
        tempRecArr = await lbvx.locateImgs(tempRecArr);
        return tempRecArr;
      }
    }
  } catch (err) {
    console.log(chalk.bgRed("couldnt find"));
    console.log(chalk.bgRed(err.message));
  }
}

async function locateImgs(tempRecArr) {
  let recommendations = await csv().fromFile(csvFilePath);
  try {
    let data = JSON.parse(JSON.stringify(recommendations));
    tempRecArr.forEach((rec) => {
      console.log(chalk.bgMagenta("searching img URL for : ", rec.title));
      // console.log(rec.title);
      for (var y of data) {
        let tempYObj = JSON.parse(y[0]);
        // console.log(tempYObj[0].title);
        if (
          rec.title.includes(tempYObj[0].title) ||
          tempYObj[0].title.includes(rec.title)
          // || tempObj[0].title == rec.title
        ) {
          console.log("found it:");
          console.log(chalk.bgCyan(tempYObj[0].img_url));
          console.log((rec.img_url = tempYObj[0].img_url));
          return;
        }
      }
    });
  } catch (bs) {
    console.log(chalk.bgRed("error: ", bs.message));
  }
  return tempRecArr;
}

export default {
  // getGenre: function (genre) {
  //   console.log(genre);
  //   try {
  //     // await
  //    return  lbvx.searchGenre(genre)
  //   //  .then((bookData) => res.json(bookData));
  //   } catch (err) {
  //     console.log(err.message);
  //   }

  // },

  // getId: async function (id) {
  //   console.log(id);
  //   //await
  //  return lbvx.getSpecificBook(id)
  // //  .then((bookData) => res.json(bookData));
  // },

  // getRecs: async function (name) {
  //   console.log(name);
  //   //await
  //   return  lbvx.findBookRecs(name)
  //   // .then((recs)=>res.json(recs))
  // },

  // getGenreLBVX : (genre) => {
  //   console.log(chalk.green("contacting librivox"));

  //   return axios({
  //     method: "get",
  //     url:
  //       "https://corsproxy.io/?" +
  //       encodeURIComponent(
  //         `https://librivox.org/api/feed/audiobooks/genre/${genre}?format=json`
  //       ),
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //   });
  // },

  searchGenre: (genre) => {
    return cors(
      "get",
      `https://librivox.org/api/feed/audiobooks/genre/${genre}?format=json`
    );
  },

  getRandomBook: (books) => {
    let randomBook = books[Math.floor(Math.random() * books.length)];
    // console.log(randomBook);
    return cors("get", randomBook.url_librivox);
  },

  buildBookObj: async (page) => {
    console.log(chalk.green("building book object"));
    let $ = cheerio.load(page.data);
    book.bkTitle = $(".book-page-book-cover").next("h1").text();

    // try {
    //   book.bkRecs = await findBookRecs(book.bkTitle);
    // } catch (error) {
    //   console.log(error);
    // }

    book.bkAuthor = $(".book-page-author").text();
    book.bkDescription = $(".description").text();
    book.bkImage = $(".book-page-book-cover").children().attr("src");
    book.bkChapters = [];
    $(".chapter-name").each(function (i, element) {
      let chapter = {};
      chapter.chTitle = $(element).text();
      chapter.chLink = $(element).attr("href");
      book.bkChapters.push(chapter);
    });
    // console.log(Object.values(book));
    return book;
  },

  getRandomChapter: (book) => {
    let randIndex = Math.floor(Math.random() * book.bkChapters.length);
    let playedCh = book.bkChapters[randIndex];
    let secLink = playedCh.chLink.replace("http", "https");
    playedCh.chLink = secLink;
    return playedCh;
  },

  getRandomColor: function () {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  },
};

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// const handler = (req, res) => {
//   const d = new Date()
//   res.end(d.toString())
// }

// module.exports = allowCors(handler)
