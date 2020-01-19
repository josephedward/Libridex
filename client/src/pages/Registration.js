/* NEEDS TO BE BLOCKED IF LOGGED IN - CONTEXT */
/* SEND REGISTRATION NODEMAILER */

import React from "react";
import {
  Button,
  Form,
  Image,
  Header,
  // Menu,
  Grid,
  Container
} from "semantic-ui-react";
import Header1 from "../components/Header";
import Footer from "../components/Footer";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
import axios from "axios";

class SignupPage extends React.Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: ""
    };

    this.postUser = this.postUser.bind(this);
  }

  postUser() {
    //test
    console.table(this.state);

    axios
      .post("/api/users/register", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      })
      .then(response => {
        return response;
        // console.log(response);
      })
      .catch(error => {
        console.table(error);
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="All">
        <Header1 />
        <Container
          fluid
          className="main center layout maroon width1000 border2"
          style={padSty}
        >
          <Header className="text-center blackborder font50 black fontBlue">
            <h1 className="white1">Create your Libridex account</h1>
          </Header>
          <Grid stackable celled columns={2} className="blackborder">
            <Grid.Column className="white1">
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="First name"
                    placeholder="First name"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.handleInputChange}
                  />
                  <Form.Input
                    fluid
                    label="Last name"
                    placeholder="Last name"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Input
                  label="Email"
                  placeholder="email@email.com"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  <Form.Input
                    fluid
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Button onClick={this.postUser}>Submit</Button>
              </Form>
            </Grid.Column>
            <Grid.Column className="white1">
              <Image
                src="./images/book1.jpg"
                floated="left"
                rounded
                size="large"
              />
            </Grid.Column>
          </Grid>
        </Container>
        <footer>
          <Footer className="border footer" />
        </footer>
      </div>
    );
  }
}

export default SignupPage;

const padSty = {
  padding: "20px"
};

// getCurrentUser = userFromNav => {
//   this.setState({ currentUser: userFromNav });
//   this.getUserObj();
// };

// getUserObj() {
//   axios.get(`/api/users/?email=${this.state.currentUser}`).then(res => {
//     this.setState({ userObj: res.data[0] });
//     this.setState({ loggedIn: true });
//   });
// }

// handleLogInClick() {
//   console.log("login");
//   this.setState({ thisIsTheBoolean: true });
// }

// handleSignUpClick() {
//   console.log("signup");
//   this.setState({ thisIsTheBoolean: false });
// }

// import React, { Component } from "react";
// import { Button, Form } from "semantic-ui-react";
// import "whatwg-fetch";

// class Signup extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       signUpError: "",
//       signUpEmail: "",
//       signUpPassword: ""
//     };

//     this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
//       this
//     );
//     this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
//       this
//     );

//     this.onSignUp = this.onSignUp.bind(this);
//   }

//   onTextboxChangeSignUpEmail(event) {
//     this.setState({
//       signUpEmail: event.target.value
//     });
//   }

//   onTextboxChangeSignUpPassword(event) {
//     this.setState({
//       signUpPassword: event.target.value
//     });
//   }

//   onSignUp() {
//     // Grab state
//     const { signUpEmail, signUpPassword } = this.state;

//     this.setState({
//       isLoading: true
//     });

//     // Post request to backend
//     fetch("/api/account/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: signUpEmail,
//         password: signUpPassword
//       })

//     })
//       // .then(res => res.json())
//       //     .then(res => res.text())          // convert to plain text
//       // .then(text => console.log(text))  // then log it out
//       .then(json => {
//         console.log("json", json);
//         if (json.success) {

//           this.setState({
//             signUpError:json.message ,
//             isLoading: false,
//             signUpEmail: "",
//             signUpPassword: ""
//           });

//   json.message="REGISTRATION SUCCESSFUL"

//         } else {
//           this.setState({
//             signUpError: json.message,
//             isLoading: false
//           });
//         }

//       });
//   }

//   render() {
//     const { signUpEmail, signUpPassword, signUpError } = this.state;

//     return (
//       <div>
//         <Form>
//           <Form.Group>
//             <Form.Input
//               label="Email Address"
//               type="email"
//               placeholder="Email"
//               value={signUpEmail}
//               onChange={this.onTextboxChangeSignUpEmail}
//             />

//             <Form.Input
//               label="Password"
//               type="password"
//               placeholder="Password"
//               value={signUpPassword}
//               onChange={this.onTextboxChangeSignUpPassword}
//             />
//           </Form.Group>
//           {signUpError ? <p>{signUpError}</p> : null}

//           <Button className="ui button" color="blue" onClick={this.onSignUp}>
//          Register
//         </Button>
//         </Form>

//       </div>
//     );
//   }
// }

// export default Signup;
