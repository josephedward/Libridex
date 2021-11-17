import React from "react"; 
import {Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Player";
import Library from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import RegisterUser from "./pages/Registration";
import SignOn from "./pages/Login";
import Admin from "./pages/Admin.js"
import history from "./utils/history";

function App(props) {

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route className="fullHeight" exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
