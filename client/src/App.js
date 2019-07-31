import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AudiobookPlayer from "./AudiobookPlayer";
import UserLibrary from "./UserLibrary";
import NoMatch from "./NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          {/* <Route exact path="/" component={Books} /> */}
          <Route exact path="/" component={AudiobookPlayer} />
          <Route exact path="/UserLibrary" component={UserLibrary} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
