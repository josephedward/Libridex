import React from 'react';
import {
  Button,
  Form,
  Message,
  Menu,
  Grid,
  Container
} from 'semantic-ui-react';
import Header1 from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';



class SignupPage extends React.Component {

  state = {
    currentUser: null,
    userObj: {},
    // book: {},
    // randomChapter:{}
  };


  getCurrentUser = userFromNav => {
    this.setState({ currentUser: userFromNav });
    this.getUserObj();
  };

  getUserObj() {
    axios.get(`/api/users/?email=${this.state.currentUser}`).then(res => {
      // console.log(res.data);
      this.setState({ userObj: res.data[0] });
      this.setState({ loggedIn: true });
    });
  }

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
          <Form success>
            <Form.Input label="Email" placeholder="joe@schmoe.com" />
            <Message
              success
              header="Form Completed"
              content="You're all signed up for the newsletter"
            />
            <Button>Submit</Button>
          </Form>
        </Container>
        <Footer className="border footer" />
      </div>
    );
  }
}

export default SignupPage;
