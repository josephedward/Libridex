// src/components/PrivateRoute.js

import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;

// /*
// Ref: 
// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
// */

// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useAuth } from "./context/auth";

// function PrivateRoute({ component: Component, ...rest }) {
//   //   const isAuthenticated = useAuth();
//   const { authTokens } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authTokens ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/signon", state: { referer: props.location } }}
//           />
//         )
//       }
//     />
//   );
// }

// export default PrivateRoute;
