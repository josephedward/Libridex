const path = require("path");
const router = require("express").Router();
const lbvx= require("./book-scrape")


// API Routes
router.route("/").get(
  function (req, res) {
    res.json(book);
  }
);

router.route("/api/audiobook/genre/:id").get(async function (req, res) {
  console.log(req.params.id);
  try {
    await searchGenre(req.params.id).then((bookData) => res.json(bookData));
  } catch (err) {
    console.log(err.message);
  }
});

router.route("/api/audiobook/book/:id").get(async function (req, res) {
  console.log(req.params.id);
  await getSpecificBook(req.params.id).then((bookData) => res.json(bookData));
});


router.route("/api/audiobook/book/:name/recs").get(async function (req, res) {
  console.log(req.params.name);
 return await findBookRecs(req.params.name).then((recs)=>res.json(recs))
});


// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });


module.exports = router;
