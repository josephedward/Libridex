import React from "react";
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
import axios from "axios";
import { Grid, Container} from "semantic-ui-react";
import Chapter from "../components/Chapter";
import Recommendations from "../components/Recommendations";

class Player extends React.Component {
  state = {
    currentUser: null,
    userObj: {},
    searchText: "",
    book: {},
    image: [],
    author: [],
    title: [],
    description: [],
    randomChapter: [],
    thisIsTheBoolean: true,
    bookID: [],
    bookURL: [],
    loggedIn: false,
    recommendations: [],
  };

  handleLogInClick() {
    console.log("login");
    this.setState({ thisIsTheBoolean: true });
  }

  handleSignUpClick() {
    console.log("signup");
    this.setState({ thisIsTheBoolean: false });
  }

  handleNext = (event) => {
    if (event) {
      event.preventDefault();
    }

    axios
      .get(`/api/audiobook/genre/${this.state.searchText || "science fiction"}`)
      .then((res) => {
        let bookData = res.data;
        // console.log("got here");
        this.setBook(bookData);
      });
  };

  getSpecificBook = (id) => {
    console.log(id);
    axios.get(`/api/audiobook/book/${id}`).then((res) => {
      let bookData = res.data;
      // console.log("got here");
      this.setBook(bookData);
    });
  };

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleNext();
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    axios.get(`/api/audiobook`).then((res) => {
      const bookData = res.data;
      console.log("componentDidMount bookData: ", bookData);
      if (bookData.bkID) {
        let randChap = this.playRandomChapter(bookData);
        this.setState({
          book: bookData,
          image: bookData.bkImage,
          title: bookData.bkTitle,
          author: bookData.bkAuthor,
          description: bookData.bkDescription,
          randomChapter: randChap,
          bookID: bookData.bkID,
          bookURL: bookData.bkURL
        });
      }
    });
    this.handleNext();
  }

  getRecs = (title) => {
    axios.get(`/api/audiobook/${title}/recs`).then((res) => {
      if (res.data) {
        this.setState({ recommendations: res.data });
      }
    });
  };

  setBook = (bookData) => {
    console.log(bookData);
    let randChap = this.playRandomChapter(bookData);
    this.setState({
      book: bookData,
      image: bookData.bkImage,
      title: bookData.bkTitle,
      author: bookData.bkAuthor,
      description: bookData.bkDescription,
      randomChapter: randChap,
      bookID: bookData.bkID,
      bookURL: bookData.bkURL,
      recommendations: bookData.bkRecs,
    });
  };

  playRandomChapter = (book) => {
    let randIndex = Math.floor(Math.random() * book.CHS.length);
    let playedCh = book.CHS[randIndex];
    let secLink = playedCh.chLink.replace("http", "https");
    playedCh.chLink = secLink;
    return playedCh;
  };

  getCurrentUser = (userFromNav) => {
    this.setState({ currentUser: userFromNav });
    this.getUserObj();
  };

  handleLike = (event) => {
    if (event) {
      event.preventDefault();
    }

    if (this.state.loggedIn) {
      let tempUser = this.state.userObj;

      if (!tempUser.likes.includes(this.state.book)) {
        tempUser.likes.push(this.state.book);
      }
      this.setState({ userObj: tempUser });
      console.log(this.state.userObj);
      axios
        .put(`api/users/?email=${this.state.userObj.email}`, this.state.userObj)
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert(
        "User preference storage is in the feature queue. Please check back later. "
      );
    }
  };


  getUserObj() {
    axios.get(`/api/users/?email=${this.state.currentUser}`).then((res) => {
      // console.log(res.data);
      this.setState({ userObj: res.data[0] });
      this.setState({ loggedIn: true });
    });
  }

  render() {

    return (
      <div className="all">
        <Navbar />
        <div style={{ height: "100vh" }}>
          <Container
            fluid
            className="layout nicefont width1000 border2 maroon main"
          >
            <Grid celled stackable columns={2} className="black">
              <Grid.Column verticalAlign="middle">
                <BookPlayer randomChapter={this.state.randomChapter} />
                <Grid.Row>
                  <Grid columns={2}>
                    <Grid.Column>
                      <NextButton handleNext={this.handleNext} />
                    </Grid.Column>
                    <Grid.Column>
                      <LikeButton handleLike={this.handleLike} />
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                <Search
                  handleInputChange={this.handleInputChange}
                  handleKeyPress={this.handleKeyPress.bind(this)}
                  handleNext={this.handleNext}
                  searchText={this.state.searchText}
                />
                <br />
                <UserLibrary
                  books={this.state.userObj.likes}
                  deleteBook={this.deleteBook}
                  getSpecificBook={this.getSpecificBook}
                />
              </Grid.Column>
            </Grid>
            <Grid celled stackable columns={2} className="black">
              <Grid.Column verticalAlign="middle">
                <BookImage verticalAlign="middle" image={this.state.image} />
              </Grid.Column>
              <Grid.Column>
                <Chapter randomChapter={this.state.randomChapter} />
                <Title title={this.state.title} />
                <Author author={this.state.author} />
                <Description description={this.state.description} />
              </Grid.Column>
            </Grid>
            <div>
              {this.state.recommendations ? (
                <div>
                  <h3 style={{ color: "white" }}>Recommendations</h3>
                  <Grid stackable centered columns={3}>
                    <Recommendations
                      style={{ overflow: "hidden", color: "black" }}
                      getSpecificBook={this.getSpecificBook}
                      recommendations={this.state.recommendations}
                    />
                  </Grid>
                </div>
              ) : (
                ""
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Player;
