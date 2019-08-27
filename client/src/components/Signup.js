import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import "whatwg-fetch";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: "",
      signUpEmail: "",
      signUpPassword: ""
    };

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );

    this.onSignUp = this.onSignUp.bind(this);
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword
      })
    })
      // .then(res => res.json())
      //     .then(res => res.text())          // convert to plain text
      // .then(text => console.log(text))  // then log it out
      .then(json => {
        console.log("json", json);
        if (json.success) {
          // json.message=

          this.setState({
            signUpError: "REGISTRATION SUCCESSFUL",
            isLoading: false,
            signUpEmail: "",
            signUpPassword: ""
          });


        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
        
      });
  }

  render() {
    const { signUpEmail, signUpPassword, signUpError } = this.state;

    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Input
              label="Email Address"
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />

            <Form.Input
              label="Password"
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
          </Form.Group>
          {signUpError ? <p>{signUpError}</p> : null}

          <Button className="ui button" color="blue" onClick={this.onSignUp}>
         Register
        </Button>
        </Form>


      </div>
    );
  }
}

export default Signup;
