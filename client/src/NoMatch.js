import React from "react";


import {Container} from 'semantic-ui-react';

function NoMatch() {
  return (
    <Container className="white1 fullHeight">
            <Container className="white1 fullHeight center" >
            <h1>404 Page Not Found
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
            </h1>
            </Container>
    </Container>
  );
}

export default NoMatch;
