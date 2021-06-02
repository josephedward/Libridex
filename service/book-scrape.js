const axios = require("axios");
const _ = require("lodash");
const cheerio = require("cheerio");
const chalk = require("chalk");
const router = require("express").Router();
const csv = require("csvtojson");
let book = {};
const csvFilePath = "./data/csv/denormalized_scrape_match_v3-3.csv";

// searchGenre("");
// findBookRecs('The Colors of Space')
// buildRecObj('https://librivox.org/the-odyssey-by-homer/')
// getSpecificBook(65)

searchGenre = (genre) => {
  return getGenreLBVX(genre)
    .then((res) => {
      const books = res.data.books;
      const { url_librivox, id } =
        books[Math.floor(Math.random() * books.length)];
      book.bkID = id;
      book.bkURL = url_librivox;
      return axios.get(url_librivox);
    })
    .then(buildBookObj);
  // .then(book => findBookRecs(book.bkTitle))
};

getSpecificBook = (id) => {
  return getSpecificBookLBVX(id)
    .then((res) => {
      const books = res.data.books;
      // comes in array 
      const { url_librivox, id} = books[Math.floor(Math.random() * books.length)];
      book.bkID = id;
      book.bkURL = url_librivox;
      return axios.get(url_librivox);
    })
    .then(buildBookObj);
};

getGenreLBVX = (genre) => {
  console.log(chalk.green("contacting librivox"));
  return axios.get(
    `https://librivox.org/api/feed/audiobooks/genre/^${genre}?format=json`
  );
};

getSpecificBookLBVX = (id) => {
  console.log(chalk.green("contacting librivox"));
  return axios.get(`https://librivox.org/api/feed/audiobooks/id/${id}`);
};

//build book object
async function buildBookObj(page) {
  console.log(chalk.green("building book object"));
  let $ = cheerio.load(page.data);
  book.bkTitle = $(".book-page-book-cover").next("h1").text();

  try {
    book.bkRecs = await findBookRecs(book.bkTitle);
  } catch (error) {
    console.log(error);
  }

  book.bkAuthor = $(".book-page-author").text();
  book.bkDescription = $(".description").text();
  book.bkImage = $(".book-page-book-cover").children().attr("src");
  book.CHS = [];
  $(".chapter-name").each(function (i, element) {
    let chapter = {};
    chapter.chTitle = $(element).text();
    chapter.chLink = $(element).attr("href");
    book.CHS.push(chapter);
  });
  // console.log(Object.values(book));
  return book;
}

async function findBookRecs(bookTitle) {
  let recommendations = await csv().fromFile(csvFilePath);
  console.log(chalk.bgGreen("searching recommendations for : ", bookTitle));
  try {
    rec_list = [];
    let data = JSON.parse(JSON.stringify(recommendations));
    for (var x of data) {
      tempObj = JSON.parse(x[0]);
      console.log(tempObj[0].title);
      if (
        bookTitle.includes(tempObj[0].title) ||
        tempObj[0].title.includes(bookTitle) ||
        tempObj[0].title == bookTitle
      ) {
        console.log("found it:");
        // console.log(tempObj[0].description)
        console.log(tempObj[0].img_url);
        console.log("recommendations: ");
        console.log(JSON.parse(tempObj[0].Rec_Info_Arr));
        tempRecArr = JSON.parse(tempObj[0].Rec_Info_Arr);
        tempRecArr = await locateImgs(tempRecArr);
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
      console.log(rec.title);
      for (var y of data) {
        tempYObj = JSON.parse(y[0]);
        console.log(tempYObj[0].title);
        if (
          rec.title.includes(tempYObj[0].title) ||
          tempYObj[0].title.includes(rec.title) ||
          tempObj[0].title == rec.title
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
module.exports = router;
