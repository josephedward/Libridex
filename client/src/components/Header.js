import React from "react";
import { Header, Segment, Menu, MenuItem } from "semantic-ui-react";
import { useAuth0 } from "../react-auth0-spa.js";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      <Segment
        inverted
        style={{
          border: "1px solid aqua",
        }}
      >
        <Menu
          inverted
          stackable
          fluid
          style={{
            backgroundColor: "maroon",
            border: "tan 1px solid",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <MenuItem>
              <Header as="h1" style={{ ...headStyle }}>
                <Header.Content
                  style={{
                    fontSize: "50px",

                    color: "darkblue",
                    WebkitTextStrokeWidth: "1px",
                    WebkitTextStrokeColor: "aqua",
                  }}
                >
                  Libridex
                </Header.Content>
              </Header>
            </MenuItem>
          </div>
          <Menu.Menu position="left">
            <Menu.Item name="home" href="/" />

            {isAuthenticated ? (
              //what to do when logged in
              <Menu.Item name="logout" onClick={() => logout()}>
                Logout {user.name}
              </Menu.Item>
            ) : (
              //what to do when not logged in
              <Menu.Item name="login" onClick={() => loginWithRedirect({})} />
            )}

            <Menu.Item name="profile" href="/profile" />
          </Menu.Menu>
          <Menu.Item position="right" style={{ paddingRight: "1%" }}>
            <div
              style={{
                alignItems: "center",
                color: "white",
              }}
            >
              Audiobook Shuffle
              <p>
                <a href="https://github.com/josephedward"> @josephedward</a>
              </p>
            </div>
          </Menu.Item>
        </Menu>
      </Segment>
    </div>
  );
};

export default Navbar;

const headStyle = {
  fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
};
