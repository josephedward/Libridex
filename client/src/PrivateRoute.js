/*
Ref: 
https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  //   const isAuthenticated = useAuth();
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (

          <Redirect
          //props.location is undefined? 
            to={{ pathname: "/signon", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
