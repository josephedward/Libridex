import React from "react"; // , { useState }
import {Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Player";
import Library from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import RegisterUser from "./pages/Registration";
import SignOn from "./pages/Login";

//import Admin from "./pages/Admin.js"
import PrivateRoute from "./PrivateRoute";
// import { AuthContext } from "./context/auth";

import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

function App(props) {

  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route className="fullHeight" exact path="/" component={Home} />
          <PrivateRoute
            className="fullHeight"
            exact
            path="/profile"
            component={Library}
          />
          <Route
            className="fullHeight"
            exact
            path="/login"
            component={SignOn}
          />
          <Route
            className="fullHeight"
            exact
            path="/register"
            component={RegisterUser}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
