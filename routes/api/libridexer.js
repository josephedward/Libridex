const axios = require('axios');
const _ = require('lodash');
const cheerio = require('cheerio');
const chalk = require('chalk');
const router = require('express').Router();

let visitedLink;
let book = {};

// function testNestedCalls(theCall) {
//   theCall
//     .then(() => {
//       console.log(chalk.blue.bgYellow('API calls executed '));
//       // console.trace();
//     })
//     .catch(e => {
//       console.log(chalk.red('callback error: ') + e);
//       // console.trace();
//     });
// }

getGenreLBVX = genre => {
  console.log(chalk.green('contacting librivox'));
  return axios.get(
    `https://librivox.org/api/feed/audiobooks/genre/^${genre}?format=json`
  );
};

getSpecificBookLBVX=(id)=>{
  console.log(chalk.green('contacting librivox'));
  return axios.get(
    `https://librivox.org/api/feed/audiobooks/id/${id}`
  );
}
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
//     let randIndex = Math.floor(Math.random() * (wholeResponse.length + 1));
//     console.log(randIndex);
//     lbvx_URL = wholeResponse[randIndex].url_librivox;
//     book.bkID=wholeResponse[randIndex].id;
//     book.bkURL=lbvx_URL;
//     console.log(lbvx_URL);
//     return book;
//   }));
// };

// getBookPage = book => {
//   console.log(book);
//   console.log(chalk.green('Fetching page content from URL'));
//   return (bookPage = book.bkURL.then(page => {
//     axios.get(page).then(
//       res => {
//         // buildBookObj(res,book);
//       }
//       // playRandomChapter(buildBookObj(res))}
//     );
//   }));
// };

//build book object
//then send to mongo
//SINGLE BOOK
function buildBookObj(page) {
  console.log(chalk.green('building book object'));
  let $ = cheerio.load(page.data);

  book.bkTitle = $('.book-page-book-cover')
    .next('h1')
    .text();
  book.bkAuthor = $('.book-page-author').text();
  book.bkDescription = $('.description').text();
  book.bkImage = $('.book-page-book-cover')
    .children()
    .attr('src');
  console.log(book.bkImage);
  book.CHS = [];
  $('.chapter-name').each(function(i, element) {
    let chapter = {};
    chapter.chTitle = $(element).text();
    chapter.chLink = $(element).attr('href');
    book.CHS.push(chapter);
  });
  randomBook = book;
  return book;
}


// testLBVX = () => {
//   testNestedCalls(getBookPage(getRequestURL(getAllLBVX())));
// };

searchGenre = genre => {
  return getGenreLBVX(genre)
    .then(res => {
      const books = res.data.books;
      const { url_librivox, id } = books[Math.floor(Math.random() * books.length)];
      book.bkID=id;
      book.bkURL=url_librivox;
      return axios.get(url_librivox);
    })
    .then(buildBookObj);
};

getSpecificBook = id => {
  return getSpecificBookLBVX(id)
    .then(res => {
      const books = res.data.books;
      const { url_librivox } = books[Math.floor(Math.random() * books.length)];
 
      return axios.get(url_librivox);
    })
    .then(buildBookObj);
};


searchGenre('');

//should match to /api/audiobook
router.route('/').get(
  function(req, res) {
    res.send(book);
  }
  // book
);

router.route('/genre/:id').get(function(req, res) {
  console.log(req.params.id);
  searchGenre(req.params.id).then(bookData => res.json(bookData));
});


router.route('/book/:id').get(function(req, res) {
  console.log(req.params.id);
  getSpecificBook(req.params.id).then(bookData => res.json(bookData));
});

module.exports = router;

