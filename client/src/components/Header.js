import React, { Component } from "react";
import { Header, Segment, Menu } from "semantic-ui-react";
import { useAuth0 } from "../react-auth0-spa.js";

const Navbar =()=> {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
      <div>
      {isAuthenticated ? 
      (<button onClick={() => logout()}>Log out</button>)
      :(<button onClick={() => loginWithRedirect({})}>Log in</button>)
      }
        <Segment
          inverted
          style={{
            border: "1px solid aqua"
          }}
        >
          <Menu
            inverted
            stackable
            fluid
            style={{
              backgroundColor: "maroon",
              border:"tan 1px solid"
            }}
          >
            <Header
              as="h1"
              style={{ ...headStyle }}
            >
              <Header.Content
                style={{
                  fontSize: "50px",
                  padding: "20px",
                  color: "darkblue",
                  "WebkitTextStrokeWidth": "1px",
                  "WebkitTextStrokeColor": "aqua"
                }}
              >
                Libridex
              </Header.Content>


            <Header.Subheader
              style={{"color":"white",
              }}
              >Audiobook Shuffle</Header.Subheader>
                        </Header>
            <Menu.Item style={{ padding: "0" }}></Menu.Item>
            {/* <hr /> */}
            <Menu.Menu position="right">
              <Menu.Item
                name="home"
                href="/"
              />
              <Menu.Item
                name="register"
                href="/register"
              />

              <Menu.Item
                name="signon"
                href="/signon"
              />

              <Menu.Item
                name="library"
                href="/library"
              />
            </Menu.Menu>
          </Menu>
        </Segment>
      </div>
    );
}

export default Navbar;

const headStyle = {
  fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
};
