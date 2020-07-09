import React from "react";
import { Container } from "semantic-ui-react";
import Header1 from "../components/Header";

function NoMatch() {
  return (
    <div style={{ textAlign: "center" }}>
      <Header1 />
      <Container className="white1 fullHeight">
        <span
        role="img"
        aria-label="404 emoji"
        > 🙄</span>
        <h1>404 Page Not Found</h1>
        <iframe
          title="404 Status Doggo"
          src="https://httpstatusdogs.com/img/404.jpg"
          style={{ height: "500px", width: "630px", textAlign: "center" }}
        ></iframe>
        {/* </Container> */}
      </Container>
    </div>
  );
}

export default NoMatch;
