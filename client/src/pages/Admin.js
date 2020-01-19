// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71
import React from "react";
import { Button } from "semantic-ui-react";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;