/* NEEDS TO BE BLOCKED IF LOGGED IN - CONTEXT */
/* SEND REGISTRATION NODEMAILER */

import React, {
  //  Component, 
   useState } from "react";
import { 
  // Link,
   Redirect } from "react-router-dom";
// import { useAuth } from "../context/auth";

import {
  Button,
  Form,
  Image,
  Header,
  Grid,
  Container
} from "semantic-ui-react";
import Header1 from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

function Registration(){
let userObj={}
const [isLoggedIn, 
  // setLoggedIn
] = useState(false);
// const [isError, setIsError] = useState(false);
// const [email, setemail] = useState("");
// const [password, setPassword] = useState("");
// const { setAuthTokens } = useAuth();


function  postUser() {

    //test
    console.table(userObj);
    axios
      .post("/api/users/register", {
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        email: userObj.email,
        password:  userObj.password,
        password2:  userObj.password2
      })
      .then(response => {
        return response;
        // console.log(response);
      })
      .catch(error => {
        console.table(error);
      });
  }

  function handleInputChange (event) {
    const {name, value } = event.target;
    userObj[name]= value
  };



  if (isLoggedIn===true) {
    return <Redirect to="/library" />;
  }else
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
                    value={userObj.firstname}
                    onChange={handleInputChange}
                  />
                  <Form.Input
                    fluid
                    label="Last name"
                    placeholder="Last name"
                    name="lastname"
                    value={userObj.lastname}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Input
                  label="Email"
                  placeholder="email@email.com"
                  name="email"
                  value={userObj.email}
                  onChange={handleInputChange}
                />
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Password"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={userObj.password}
                    onChange={handleInputChange}
                  />
                  <Form.Input
                    fluid
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    name="password2"
                    value={userObj.password2}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button onClick={postUser}>Submit</Button>
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

export default Registration;

const padSty = {
  padding: "20px"
};

