import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Grid,
  Header,
  Image,
  Message,
  Segment
  // Error
} from "semantic-ui-react";
import Header1 from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../context/auth";

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  // const referer = props.location.state.referrer || '/';

  function postLogin() {
    axios
      .post("/api/users/login", {
        email,
        password
      })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/library" />;
  }

  // if (isLoggedIn) {
  //   return <Redirect to={referer} />;
  // }

  return (
    <div>
      <Header1 />
      <Container
        fluid
        className="main center layout maroon width1000 border2"
        style={padSty}
      >
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="./images/book.png" /> Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  value={email}
                  onChange={e => {
                    setemail(e.target.value);
                  }}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={postLogin}
                >
                  Login
                </Button>
              </Segment>

              {isError && (
                <Message negative>
                  <Message.Header>
                    The email or password provided were incorrect!{" "}
                  </Message.Header>
                </Message>
              )}
            </Form>
            <Message>
              New to us? <a href="./register">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
      <Footer className="border footer" />
    </div>
  );
}

export default Login;

const padSty = {
  padding: "20px"
};

// // import React from 'react';

// import React, { Component } from "react";
// import { Button, Form } from "semantic-ui-react";
// import "whatwg-fetch";

// import { getFromStorage, setInStorage } from "../storage/Storage";

// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       token: "",
//       signUpError: "",
//       signInError: "",
//       signInEmail: "",
//       signInPassword: "",
//       signUpEmail: "",
//       signUpPassword: ""
//     };

//     this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
//       this
//     );
//     this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
//       this
//     );
//     this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
//       this
//     );
//     this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
//       this
//     );

//     this.onSignIn = this.onSignIn.bind(this);
//     this.onSignUp = this.onSignUp.bind(this);
//     this.logout = this.logout.bind(this);
//   }

//   getUser() {
//     this.props.callbackFromNav(this.state.signInEmail);
//   }

//   componentDidMount() {
//     const obj = getFromStorage("the_main_app");
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch("/api/account/verify?token=" + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token,
//               isLoading: false
//             });
//           } else {
//             this.setState({
//               isLoading: false
//             });
//           }
//         });
//     } else {
//       this.setState({
//         isLoading: false
//       });
//     }
//   }

//   onTextboxChangeSignInEmail(event) {
//     this.setState({
//       signInEmail: event.target.value
//     });
//   }

//   onTextboxChangeSignInPassword(event) {
//     this.setState({
//       signInPassword: event.target.value
//     });
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
//             signUpError: json.message,
//             isLoading: false,
//             signUpEmail: "",
//             signUpPassword: ""
//           });
//         } else {
//           this.setState({
//             signUpError: json.message,
//             isLoading: false
//           });
//         }
//       });
//   }

//   onSignIn() {
//     const { signInEmail, signInPassword } = this.state;

//     this.setState({
//       isLoading: true
//     });

//     // Post request to backend
//     fetch("/api/account/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: signInEmail,
//         password: signInPassword
//       })
//     })
//       .then(res => res.json())
//       .then(json => {
//         console.log("json", json);
//         if (json.success) {
//           setInStorage("the_main_app", { token: json.token });
//           // console.log(signInEmail);
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//             signInPassword: "",
//             signInEmail: signInEmail,
//             token: json.token
//           });
//           this.getUser();
//         } else {
//           this.setState({
//             signInError: json.message,
//             isLoading: false
//           });
//         }
//       });
//   }

//   logout() {
//     this.setState({
//       isLoading: true
//     });
//     const obj = getFromStorage("the_main_app");
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch("/api/account/logout?token=" + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token: "",
//               isLoading: false
//             });
//           } else {
//             this.setState({
//               isLoading: false
//             });
//           }
//         });
//     } else {
//       this.setState({
//         isLoading: false
//       });
//     }
//   }

//   render() {
//     const {
//       isLoading,
//       token,
//       signInError,
//       signInEmail,
//       signInPassword
//     } = this.state;

//     if (isLoading) {
//       return <div>{/* <p>Loading...</p> */}</div>;
//     }

//     if (!token) {
//       return (
//         <div>
//           <Form>
//             <Form.Group>
//               {/* <label>Email Address</label> */}
//               <Form.Input
//                 label="Email Address"
//                 type="email"
//                 placeholder="Email"
//                 value={signInEmail}
//                 onChange={this.onTextboxChangeSignInEmail}
//               />

//               <Form.Input
//                 label="Password"
//                 type="password"
//                 placeholder="Password"
//                 value={signInPassword}
//                 onChange={this.onTextboxChangeSignInPassword}
//               />
//             </Form.Group>
//           </Form>
//           {signInError ? <div>{signInError}</div> : null}
//           <Button className="ui button" color="blue" onClick={this.onSignIn}>
//             Log In
//           </Button>
//         </div>
//       );
//     }

//     return (
//       <div>
//         <h5>Welcome {this.state.signInEmail}</h5>
//         <Button className="ui button" onClick={this.logout}>
//           Logout
//         </Button>
//         {/* <br/> */}
//       </div>
//     );
//   }
// }
// export default Login;
