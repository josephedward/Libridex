import axios from "axios";
import * as Papa from "papaparse";
const cheerio = require("cheerio");
let book = {};
const csvFilePath = "./data/denormalized_scrape_match_v3-3.csv";

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

export default {
  getRecs: () => {
    let recs = fetch(csvFilePath)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        let res = Papa.parse(responseText, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            console.log("Finished:", results.data);
            return results.data;
          },
        });
        return res.data;
      });
    return recs;
  },

  findBookRecs: async (bookTitle, recs) => {
    let tempObj = {};

    try {
      for (var x of recs) {
        tempObj = JSON.parse(x[0]);
        if (
          bookTitle.includes(tempObj[0].title) ||
          tempObj[0].title.includes(bookTitle) ||
          tempObj[0].title == bookTitle
        ) {
          let tempRecArr = JSON.parse(tempObj[0].Rec_Info_Arr);
          return tempRecArr;
        }
      }
    } catch (err) {
      console.log("couldnt find");
      console.log(err.message);
    }
  },

  locateImgs: (tempRecArr, recs) => {
    try {
      let data = JSON.parse(JSON.stringify(recs));
      tempRecArr.forEach((rec) => {
        for (var y of data) {
          let tempYObj = JSON.parse(y[0]);
          if (
            rec.title.includes(tempYObj[0].title) ||
            tempYObj[0].title.includes(rec.title)
          ) {
            rec.img_url = tempYObj[0].img_url;
            return;
          }
        }
      });
    } catch (bs) {
      console.log("error: ", bs.message);
    }
    return tempRecArr;
  },

  searchGenre: (genre) => {
    return cors(
      "get",
      `https://librivox.org/api/feed/audiobooks/genre/${genre}?format=json`
    );
  },

  getRandomBook: (books) => {
    let randomBook = books[Math.floor(Math.random() * books.length)];
    return cors("get", randomBook.url_librivox);
  },

  buildBookObj: async (page) => {
    let $ = cheerio.load(page);
    book.bkTitle = $(".book-page-book-cover").next("h1").text();

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

  queryBookId: (id) => {
    let url = `https://librivox.org/api/feed/audiobooks/id/${id}`;
    console.log(url);
    return cors("get", url).then((res) => {
      // console.log(res)
      const books = res.data.books;
      // comes in array
      const { url_librivox, id } =
        books[Math.floor(Math.random() * books.length)];
      console.log("url_librivox) : ", url_librivox);
      return cors("get", url_librivox);
    });
  },
};
