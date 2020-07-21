import React
// , { useState } 
from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Player";
import Library from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import RegisterUser from "./pages/Registration"
import SignOn from "./pages/Login"

//import Admin from "./pages/Admin.js"
import PrivateRoute from './PrivateRoute';
// import { AuthContext } from "./context/auth";

import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

function App(props) {
  // const [authTokens, setAuthTokens] = useState();
  

  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // }

  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }




  return (
    // <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
    <Router history={history} >
      <div   >
        <Switch>
          <Route className="fullHeight" exact path="/" component={Home} />
          <PrivateRoute className="fullHeight"  exact path="/profile" component={Library} />
          <Route className="fullHeight"  exact path="/login" component={SignOn} />
          <Route className="fullHeight"  exact path="/register" component={RegisterUser} />
          {/* REDIRECTS IF NOT LOGGED IN */}
          {/* <PrivateRoute className="fullHeight"  exact path="/admin" component={Admin} /> */}
          <Route component={NoMatch} />
        </Switch>
        </div>
    </Router>
    // </AuthContext.Provider>
  );
}

export default App;
