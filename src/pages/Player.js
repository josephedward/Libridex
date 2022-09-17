import React, { Component, useEffect, useState } from "react";
import Navbar from "../components/Header";
// import UserLibrary from "../components/UserLibrary";
import Search from "../components/Search";
import Title from "../components/Title";
import Author from "../components/Author";
import BookPlayer from "../components/BookPlayer";
import BookImage from "../components/BookImage";
import Description from "../components/Description";
import NextButton from "../components/NextButton";
// import LikeButton from "../components/LikeButton";
// import axios from "axios";
import {
  Grid,
  Container,
  // List,
  Dimmer,
  Loader,
  // Image,
  // Segment,
} from "semantic-ui-react";
import Chapter from "../components/Chapter";
import Recommendations from "../components/Recommendations";
import API from "../api/methods";
import * as Papa from "papaparse";
import { RecsContext } from "../api/methods";
const csvFilePath = "./data/denormalized_scrape_match_v3-3.csv";

export default function Player() {
  const [genre, setGenre] = useState("science");
  const [book, setBook] = useState([]);
  const [randomChapter, setRandomChapter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [chLink, setChLink] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recs, setRecs] = useState([]);

  var data;

  function handleNext() {
    setLoading(true);
    getGenre(genre);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleNext();
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setGenre(value);
    // handleNext();
  }

  async function getAllRecs() {
    let allRecs = fetch(csvFilePath)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        let res = Papa.parse(responseText, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            // console.log("Finished:", results.data);
            data = results.data;
            // setRecs(data);
          },
        });
        return res.data;
      });
    return allRecs;
  }

  useEffect(() => {
    getGenre("science");
  }, []);

  function getGenre(genre) {
    setGenre(genre);
    API.searchGenre(genre)
      .then((res) => {
        populateGenreBook(res);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error loading data");
        setError(true);
        setLoading(false);
      });
  }

  async function populateGenreBook(res) {
    // console.log(res.data);
    let page = await API.getRandomBook(res.data.books);
    // console.log(book.data);
    let book = await API.buildBookObj(page.data);
    // console.log(book);
    setBook(book);
    let randChap = API.getRandomChapter(book);
    setRandomChapter(randChap);

    getAllRecs().then(async (allRecs) => {
      let bookRecs = await API.findBookRecs(book.bkTitle, allRecs);
      setRecs(bookRecs);
      let imgs = await API.locateImgs(bookRecs, allRecs);
      setLoading(false);
    });
  }

  async function getBook(id) {
    API.queryBookId(id)
      .then((res) => {
        populateIdBook(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error loading data");
        setError(true);
        setLoading(false);
      });
  }

  async function populateIdBook(res) {
    let book = await API.buildBookObj(res);
    console.log(book);
    setBook(book);
    let randChap = API.getRandomChapter(book);
    setRandomChapter(randChap);

    getAllRecs().then(async (allRecs) => {
      let bookRecs = await API.findBookRecs(book.bkTitle, allRecs);

      let tempRecArr = await API.locateImgs(bookRecs, allRecs);
      setRecs(tempRecArr);
      setLoading(false);
    });
  }

  return (
    <div className="all">
      <Navbar />
      <div>
        {loading ? (
          <Dimmer active>
            <Loader size="large" inverted indeterminate>
              Loading Book
            </Loader>
          </Dimmer>
        ) : error ? (
          <div>{errorMessage}</div>
        ) : (
          <Container fluid className="nicefont width1000 border2 maroon main">
            <Grid celled stackable columns={2} className="black">
              <Grid.Column verticalAlign="middle">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BookImage
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      overflow: "show",
                    }}
                    image={book.bkImage}
                  />
                  <BookPlayer
                    style={{
                      zIndex: -10,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    randomChapter={randomChapter}
                  />
                  <NextButton handleNext={handleNext} />
                </div>
              </Grid.Column>
              <Grid.Column>
                <Search
                  handleInputChange={handleInputChange}
                  handleKeyPress={handleKeyPress.bind(this)}
                  handleNext={handleNext}
                  // searchText={genre}
                  // setSearchText={setGenre}
                  onClick={handleNext}
                />
                <br />

                <Chapter randomChapter={randomChapter} />
                <Title title={book.bkTitle} />
                <Author author={book.bkAuthor} />
                <Description description={book.bkDescription} />
                {/* <UserLibrary
              // books={this.state.userObj.likes}
              // deleteBook={this.deleteBook}
              // getSpecificBook={this.getSpecificBook}
              /> */}
              </Grid.Column>
            </Grid>
            {recs ? (
              <div>
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                    fontSize: "30px",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px #000000",
                  }}
                >
                  You might also like...
                </h3>
                {/* }}>Recommendations</h3> */}
                <Grid stackable centered columns={3}>
                  <Recommendations
                    style={{ overflow: "hidden", color: "black" }}
                    getBook={getBook}
                    recommendations={recs}
                  />
                </Grid>
              </div>
            ) : (
              "No recommendations currently"
            )}
            ,
          </Container>
        )}
      </div>
    </div>
  );
}
