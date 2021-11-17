import React, {Fragment} from 'react';
import { 
  Container, 
} from 'semantic-ui-react';
import Header1 from '../components/Header';
import { useAuth0 } from "../react-auth0-spa";



function Profile(){

    const { loading, user } = useAuth0();

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return (
      <div className="All">
         <Header1 />


        <Container fluid className="layout width1000 border2 maroon main">
        <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </Fragment>

        </Container>
      </div>
    );
}
export default Profile;


