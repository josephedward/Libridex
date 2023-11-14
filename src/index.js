import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import { createRoot } from 'react-dom/client';
// import { useLocation } from 'react-router-dom';


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

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);