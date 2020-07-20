const axios = require('axios');
const _ = require('lodash');
const cheerio = require('cheerio');
const chalk = require('chalk');
const router = require('express').Router();
const {parse, stringify} = require('flatted');
// require csvtojson module
const CSVToJSON = require('csvtojson');

let book = {};
let recommendations=[]

// convert users.csv file to JSON array
CSVToJSON().fromFile('./combined_reccomendations_v1.csv')
    .then(data => {
        // log the JSON array
        // console.log(data);
        recommendations= data;
        // console.log(recommendations)
    }).catch(err => {
        // log error if any
        console.log(err);
    });



// async function findBookRecs(bookTitle)
//    {
//      try{
//     rec_list=[]    
//    // var obj = JSON.parse(result);
//     let keys = Object.keys(recommendations);
//     for (var i = 0; i < keys.length; i++) {
//       // console.log(recommendations[keys[i]].book_title);
//       if(bookTitle.includes(recommendations[keys[i]].book_title))
//       {
//         console.log("found: ",typeof(recommendations[keys[i]].book_recommendation_urls))
        
//         return await recommendations[keys[i]].book_recommendation_urls.split(",").then((res) => {return res})
      
    
//       }
//     }}
//     catch(err){
//           console.log(err.message)
//       }
//   }


async function buildRecObj(url){
  console.log("build url -> ", url)  
  rec={}
    console.log(chalk.cyan('building book Rec obj...'));
    let page = await axios.get(url).catch(() => {}) 
    console.log(page)
    let $ = await cheerio.load(page.data).catch(() => {})
    rec.bkTitle =await  $('.book-page-book-cover').catch(() => {})
    .next('h1')
    .text();
    rec.bkImage = await $('.book-page-book-cover').catch(() => {})
    .children()
    .attr('src');
    rec.bkAuthor = await $('.book-page-author').text().catch(() => {});
    rec.link=url
    console.log(rec)
    return await rec
  }

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


// async function getRecommendations(bookTitle){
//   console.log(chalk.green("getting recommendations from flask server: ", bookTitle));
// try{
//   return await axios.get(encodeURI(`http://127.0.0.1:5000/recommend/${bookTitle}/`))
//   // return await axios.get(encodeURI(`https://gentle-tundra-97522.herokuapp.com/recommend/${bookTitle}`))
// }
// catch(err){
//     console.log(err.message)
// }
// }



//build book object
async function buildBookObj(page) {
  console.log(chalk.green('building book object'));
  let $ = cheerio.load(page.data);
  book.bkTitle = await $('.book-page-book-cover')
    .next('h1')
    .text();
  console.log(book.bkTitle)
  book.bkRecs =
  await findBookRecs(book.bkTitle)
  .then((res) => {
    // book.bkRecs =res
  return res
  })
  console.log(chalk.cyan(book.bkRecs))
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
  console.log(Object.values(book))
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


// searchGenre('');
// getSpecificBook(65)
// findBookRecs('Count of Monte Cristo')
// console.log(getRecommendations('Count of Monte Cristo'))
// console.log(buildRecObj('https://librivox.org/bleak-house-by-charles-dickens/'))

//should match to /api/audiobook
router.route('/').get(
  function(req, res) {
    
    res.json(book);
  }
  // book
);


router.route('/genre/:id').get(async function(req, res) {
  console.log(req.params.id);
  try{
  await searchGenre(req.params.id).then(bookData => res.json(bookData));}
  catch(err){
    console.log(err.message)
  }
});



router.route('/book/:id').get(async function(req, res) {
  console.log(req.params.id);
  await getSpecificBook(req.params.id).then(bookData => res.json(bookData));
});

module.exports = router;















  // try{
  //  recArr=[] 
  // book.bkRecommendations = await getRecommendations(book.bkTitle)  
  // // console.log(Object.keys(book.bkRecommendations))
  // // console.log(Object.values(book.bkRecommendations))
  // console.log(book.bkRecommendations.data)
  // book.bkRecommendations = parse(Object.values(book.bkRecommendations.data))


  // // console.log(chalk.cyan(typeof(book.bkRecommendations),Object.keys(book.bkRecommendations)))
  // // for(x of book.bkRecommendations)
  // // {
  // //   console.log(`${chalk.cyan(Object.keys(x))}: ${chalk.magenta(Object.values(x))}`)
  // // }
  // // book.bkRecommendations=Object.values(book.bkRecommendations).data
  // // book.bkRecommendations = Object.values(book.bkRecommendations).data
  // // console.log(`${x}:${book.bkRecommendations[x]}`)
  // // recArr.push(`${x}:${book.bkRecommendations[x]}`)
  // // console.log(parse(book.bkRecommendations))
  // // console.log(recArr)
  // // book.bkRecommendations = Object.values(book.bkRecommendations)
  // }
  // catch(err)
  // {console.log(err.message)}
