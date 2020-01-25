import React from "react";
import {Container} from 'semantic-ui-react';
import Header1 from "../components/Header"


function NoMatch() {
  return (
<div
style={{textAlign:"center"}}
>
    <Header1/>
    <Container 
    className="white1 fullHeight"
    
    >


            {/* <Container 
            className="white1 fullHeight center"
             > */}
            <h1>404 Page Not Found
            {/* <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span> */}
            </h1>
            <iframe
            title="404 Status Doggo"
            src="https://httpstatusdogs.com/img/404.jpg"
            style={{height:"500px", width:"630px", textAlign:"center"}}
            ></iframe>
            {/* </Container> */}
    </Container>
    </div>
  );
}

export default NoMatch;
