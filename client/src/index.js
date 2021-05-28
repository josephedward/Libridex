import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
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
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
