import React, {Fragment} from 'react';
// import Login from '../components/Login';
// import Signup from '../../../misc/Signup';
import { 
  // Button, Menu, Grid, 
  Container, 
  // Segment 
} from 'semantic-ui-react';
// import UserLibrary from '../components/UserLibrary';
// import axios from 'axios';
import Header1 from '../components/Header';
import Footer from '../components/Footer';
// import BookContent from '../components/BookContent';
// import BookPlayer from '../components/BookPlayer';
// import Title from '../components/Title';
// import Author from '../components/Author';
// import BookImage from '../components/BookImage';
// import Description from '../components/Description';
// import Chapter from '../components/Chapter';
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
        <Footer className="border footer" />
      </div>
    );
}
export default Profile;


