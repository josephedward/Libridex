import React from "react";
import { Button, Icon } from 'semantic-ui-react';





function NextButton (props){
    return(
        <Button className="fullWidth center" color="blue" onClick={props.handleNext}>
        <p>Next</p>
        <Icon  name="sync alternate"/>
        </Button>
    )
}

export default NextButton;