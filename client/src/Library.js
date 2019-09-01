import React from 'react';
// import { Col, Row, Container } from "./components/Grid";
import Login from './components/Login';
import Signup from './components/Signup';
import { Button, Menu, Grid, Container, Segment } from 'semantic-ui-react';
import UserLibrary from './components/UserLibrary';
import axios from 'axios';
import Header1 from './components/Header';
import Footer from './components/Footer';
import BookContent from './components/BookContent';
import BookPlayer from './components/BookPlayer';
import Title from './components/Title';
import Author from './components/Author';
import BookImage from './components/BookImage';
import Description from './components/Description';
import Chapter from './components/Chapter';

class Library extends React.Component {
  state = {
    currentUser: null,
    userObj: {},
    book: {},
    randomChapter: {}
  };

  componentDidMount() {
    // this.getCurrentUser();
  }

  getCurrentUser = userFromNav => {
    this.setState({ currentUser: userFromNav });
    this.getUserObj();
  };

  handleLogInClick() {
    console.log('login');
    this.setState({ thisIsTheBoolean: true });
    // this.state.thisIsTheBoolean=false;
  }

  handleSignUpClick() {
    console.log('signup');
    this.setState({ thisIsTheBoolean: false });
    // this.state.thisIsTheBoolean=false;
  }

  deleteBook = titleToDelete => {
    let tempUser = this.state.userObj;
    let titles = this.state.userObj.likes;
    let newTitles = titles.filter(item => {
      return item.bkTitle !== titleToDelete;
    });
    tempUser.likes = newTitles;
    this.setState({ userObj: tempUser });
    axios
      .put(`api/users/?email=${this.state.userObj.email}`, this.state.userObj)
      .catch(e => {
        console.log(e);
      });
  };

  getSpecificBook = id => {
    console.log(id);
    axios.get(`/api/audiobook/book/${id}`).then(res => {
      let bookData = res.data;
      // console.log("got here");
      this.setBook(bookData);
    });
  };

  setBook = bookData => {
    this.setState({ book: bookData });
  };

  setChapter = chap => {
    // console.log("holy crap")
    console.log(this.state.randomChapter);
    this.setState({ randomChapter: chap });
    console.log(this.state.randomChapter);
  };

  getUserObj() {
    axios.get(`/api/users/?email=${this.state.currentUser}`).then(res => {
      // console.log(res.data);
      this.setState({ userObj: res.data[0] });
      this.setState({ loggedIn: true });
    });
  }

  render() {
    return (
      <div className="All">
        <Menu stackable fluid widths={3} className="blackborder header ">
          <Menu.Item className="tanish">
            <Header1 />
          </Menu.Item>

          <Menu.Item className="maroon">
            <Grid celled columns={2}>
              <Grid.Column color="black">
                <Button
                  className="ui primary button fullWidth"
                  onClick={() => {
                    this.handleLogInClick();
                  }}
                >
                  Log In
                </Button>
              </Grid.Column>
              <Grid.Column color="black">
                <Button
                  className="ui primary button fullWidth"
                  onClick={() => {
                    this.handleSignUpClick();
                  }}
                >
                  Sign Up
                </Button>
              </Grid.Column>
            </Grid>
          </Menu.Item>

          <Menu.Item className="tanish">
            {this.state.thisIsTheBoolean ? (
              <Login callbackFromNav={this.getCurrentUser} />
            ) : (
              <Signup />
            )}
          </Menu.Item>
        </Menu>
        <Container fluid className="layout width1000 border2 maroon main">
          <Grid stackable columns="equal">
            <Grid.Row className="black center contentMargin">
              <Grid.Column>
                <Segment>
                  <UserLibrary
                    books={this.state.userObj.likes}
                    deleteBook={this.deleteBook}
                    getSpecificBook={this.getSpecificBook}
                  />
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment>
                  <BookContent
                    book={this.state.book}
                    setChapter={this.setChapter}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="black border2 halfWidth center" >
            <Grid.Column className="center black">
              <BookPlayer className="center black" randomChapter={this.state.randomChapter} />
            </Grid.Column>
            </Grid.Row>

            <Grid.Row className="contentMargin border2">
              <Grid.Column verticalAlign="middle" className="black">
                <BookImage
                  verticalAlign="middle"
                  image={this.state.book.bkImage}
                />
              </Grid.Column>

              <Grid.Column>
                <Chapter randomChapter={this.state.randomChapter.chTitle} />
                <Title title={this.state.book.bkTitle} />
                <Author author={this.state.book.bkAuthor} />
                <Description description={this.state.book.bkDescription} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Footer className="border footer" />
      </div>
    );
  }
}
export default Library;
