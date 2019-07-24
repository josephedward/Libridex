import React from "react";
// import Nav from "./Nav";
import { Header } from 'semantic-ui-react'

function Header1(){
    return(
<div>
    
    <Header className="black text-center border font50" inverted color="blue">
        Libridex
        <Header.Subheader  className="fontBlue" >Audiobook Shuffle</Header.Subheader>
        </Header>
   </div>
    )
}

export default Header1;