import React, { Component } from "react";
import { Header, Segment, Menu } from "semantic-ui-react";

class Navbar extends Component {

  render() {
    return (
      <div>
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
  } //end render
}

export default Navbar;

const headStyle = {
  fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
};
