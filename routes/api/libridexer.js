const axios = require('axios');
const _ = require('lodash');
const cheerio = require('cheerio');
const chalk = require('chalk');
const router = require('express').Router();
const {parse, stringify} = require('flatted');

let book = {};



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


async function getRecommendations(bookTitle){
  console.log(chalk.green("getting recommendations from flask server"));
try{
  return await axios.get(encodeURI(`https://gentle-tundra-97522.herokuapp.com/recommend/${bookTitle}/`))
}
catch(err){
    console.log(err.message)
}
}



//build book object
async function buildBookObj(page) {
  console.log(chalk.green('building book object'));
  let $ = cheerio.load(page.data);

  book.bkTitle = $('.book-page-book-cover')
    .next('h1')
    .text();
  // try{
  // book.bkRecommendations = await getRecommendations(book.bkTitle)  
  // console.log(parse(book.bkRecommendations))
  // // book.bkRecommendations = Object.values(book.bkRecommendations)
  // }
  // catch(err)
  // {console.log(err.message)}
  book.bkAuthor = $('.book-page-author').text();
  book.bkDescription = $('.description').text();
  book.bkImage = $('.book-page-book-cover')
    .children()
    .attr('src');
  book.CHS = [];
  $('.chapter-name').each(function(i, element) {
    let chapter = {};
    chapter.chTitle = $(element).text();
    chapter.chLink = $(element).attr('href');
    book.CHS.push(chapter);
  });
  // console.log(chalk.bgCyan(Object.values(book)))
  return book;
}




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
// getSpecificBook(65)
// console.log(getRecommendations('Count of Monte Cristo'))

//should match to /api/audiobook
router.route('/').get(
  function(req, res) {
    res.send(book);
  }
  // book
);

router.route('/genre/:id').get(function(req, res) {
  console.log(req.params.id);
  try{
  searchGenre(req.params.id).then(bookData => res.json(bookData));}
  catch(err){
    console.log(err.message)
  }
});



router.route('/book/:id').get(function(req, res) {
  console.log(req.params.id);
  getSpecificBook(req.params.id).then(bookData => res.send(bookData));
});

module.exports = router;

