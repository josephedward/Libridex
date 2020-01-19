import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Player";
import Library from "./pages/Library";
import NoMatch from "./pages/NoMatch";
import RegisterUser from "./pages/Registration"
import SignOn from "./pages/Signon"
import Admin from "./pages/Admin.js"
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";

function App(props) {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (

    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router >
      <div   >
        <Switch>
          <Route className="fullHeight" exact path="/" component={Home} />
          <PrivateRoute className="fullHeight"  exact path="/library" component={Library} />
          <Route className="fullHeight"  exact path="/signon" component={SignOn} />
          <Route className="fullHeight"  exact path="/register" component={RegisterUser} />
          {/* REDIRECTS IF NOT LOGGED IN */}
          <PrivateRoute className="fullHeight"  exact path="/admin" component={Admin} />
          <Route component={NoMatch} />
        </Switch>
        </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
