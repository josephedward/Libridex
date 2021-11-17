import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import history from "./utils/history";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
} else {
  // production code
  function noop() {}
  const savedFunctions = Object.keys(console).reduce((memo, key) => {
    if (typeof console[key] == "function") {
      //keep a copy just in case we need it
      memo[key] = console[key];
      //de-fang any functions
      console[key] = noop;
    }
    return memo;
  }, {});

  function logTest() {
    console.log("Hello?");
    console.info("Hello-o-o-o?");
    console.warn("Can anybody hear me?");
    console.error("I guess there is nobody there...");
    savedFunctions.log("logging from saved function");
  }

  logTest();
}


// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
    <App />,  
  document.getElementById("root")
);
