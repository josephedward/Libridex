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
