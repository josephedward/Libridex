import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AudiobookPlayer from "./AudiobookPlayer";
import Library from "./Library";
import NoMatch from "./NoMatch";
import SignupPage from "./SignupPage"
import Passport from 'passport';
import GoogLog from "./components/GoogLog";
// import Passport from "../../authentication/passport";

function App() {
  return (
    <Router >
      <div   >
        {/* <GoogLog/> */}
        <Switch>
          <Route className="fullHeight" exact path="/" component={AudiobookPlayer} />
          <Route className="fullHeight"  exact path="/Library" component={Library} />
          <Route className="fullHeight"  exact path="/SignupPage" component={SignupPage} />
          <Route component={NoMatch} />
        </Switch>


        </div>
    </Router>
  );
}

export default App;
