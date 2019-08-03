import React from "react";
import { Col, Row} from "./components/Grid";

import Jumbotron from "./components/Jumbotron";

import {Grid, Container} from 'semantic-ui-react';

function NoMatch() {
  return (
    <Container className="white1 fullHeight">
          <Jumbotron className="white1 fullHeight center">
            <Container className="white1 fullHeight center" >
            <h1>404 Page Not Found
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
            </h1>
            </Container>
          </Jumbotron>
    </Container>
  );
}

export default NoMatch;
