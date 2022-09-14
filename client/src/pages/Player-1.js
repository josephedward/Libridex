import React, { Component, useEffect, useState } from "react";
import Navbar from "../components/Header";
import UserLibrary from "../components/UserLibrary";
import Search from "../components/Search";
import Title from "../components/Title";
import Author from "../components/Author";
import BookPlayer from "../components/BookPlayer";
import BookImage from "../components/BookImage";
import Description from "../components/Description";
import NextButton from "../components/NextButton";
import LikeButton from "../components/LikeButton";
// import axios from "axios";
import {
  Grid,
  Container,
  List,
  Dimmer,
  Loader,
  Image,
  Segment,
} from "semantic-ui-react";
import Chapter from "../components/Chapter";
import Recommendations from "../components/Recommendations";
import API from "../api/methods";

import * as Papa from 'papaparse';
const csvFilePath = "./data/denormalized_scrape_match_v3-3.csv";
const csv = require("csvtojson");

export default function Player() {
  const [genre, setGenre] = useState("science");
  const [book, setBook] = useState([]);
  const [randomChapter, setRandomChapter] = useState([]);
  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  const [thisIsTheBoolean, setThisIsTheBoolean] = useState(true);
  const [bookID, setBookID] = useState([]);
  const [bookURL, setBookURL] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  //   const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [userObj, setUserObj] = useState({});
  const [chLink, setChLink] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recs, setRecs] = useState(getRecs());

  async function getRecs() {
    await fetch("./data/denormalized_scrape_match_v3-3.csv")
    .then( response => response.text() )
    .then( responseText => {
        // -- parse csv
        var data = Papa.parse(responseText);
        console.log('data:', data);
    });
  }
  

  useEffect(() => {
    API.searchGenre(genre)
      .then(async (res) => {
        // console.log(res.data);
        let page = await API.getRandomBook(res.data.books);
        // console.log(book.data);
        let book = await API.buildBookObj(page);
        console.log(book);
        setBook(book);
        let randChap = API.getRandomChapter(book);
        setRandomChapter(randChap);
        console.log(recs);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error loading data");
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    // {loading ? (
    //     <Dimmer active>
    //       <Loader size="massive" inverted indeterminate>
    //         Preparing Projects
    //       </Loader>
    //     </Dimmer>
    //   ) : error ? (
    //     <div>{errorMessage}</div>
    //   ) : (
    //     <List>
    //       {projects
    //         ? projects.map((project) => (
    //             <PFrame
    //               key={project.id}
    //               title={project.title}
    //               name={project.name}
    //               html_url={project.html_url}
    //               homepage={project.homepage}
    //               description={project.description}
    //             />
    //           ))
    //         : testProjects.map((project) => (
    //             <PFrame
    //               key={project.id}
    //               title={project.title}
    //               name={project.name}
    //               html_url={project.html_url}
    //               homepage={project.homepage}
    //               description={project.description}
    //             />
    //           ))}
    //     </List>
    //   )}

    <div className="all">
      <Navbar />
      {loading ? (
        <Dimmer active>
          <Loader size="massive" inverted indeterminate>
            Loading Book
          </Loader>
        </Dimmer>
      ) : error ? (
        <div>{errorMessage}</div>
      ) : (
        <div style={{ height: "100vh" }}>
          <Container
            fluid
            className="layout nicefont width1000 border2 maroon main"
          >
            <Grid celled stackable columns={2} className="black">
              <Grid.Column verticalAlign="middle">
                <BookPlayer randomChapter={randomChapter} />
                <Grid.Row>
                  <Grid columns={2}>
                    <Grid.Column>
                      <NextButton
                      // handleNext={this.handleNext}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <LikeButton
                      // handleLike={this.handleLike}
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                <Search
                // handleInputChange={this.handleInputChange}
                // handleKeyPress={this.handleKeyPress.bind(this)}
                // handleNext={this.handleNext}
                // searchText={this.state.searchText}
                />
                <br />
                <UserLibrary
                // books={this.state.userObj.likes}
                // deleteBook={this.deleteBook}
                // getSpecificBook={this.getSpecificBook}
                />
              </Grid.Column>
            </Grid>
            <Grid celled stackable columns={2} className="black">
              <Grid.Column verticalAlign="middle">
                <BookImage
                  verticalAlign="middle"
                  //   image={this.state.image}
                  image={book.bkImage}
                />
              </Grid.Column>
              <Grid.Column>
                <Chapter randomChapter={randomChapter} />
                <Title title={book.bkTitle} />
                <Author author={book.bkAuthor} />
                <Description description={book.bkDescription} />
              </Grid.Column>
            </Grid>
            <div>
              {recs ? (
                <div>
                  <h3 style={{ color: "white" }}>Recommendations</h3>
                  <Grid stackable centered columns={3}>
                    <Recommendations
                      style={{ overflow: "hidden", color: "black" }}
                      // getSpecificBook={this.getSpecificBook}
                      // recommendations={this.state.recommendations}
                    />
                  </Grid>
                </div>
              ) : (
                ""
              )}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
