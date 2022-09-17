import React from "react";
import { Button, Icon } from 'semantic-ui-react';

function LikeButton (props){
    return(
        <Button className="fullWidth blue" color="blue" onClick={props.handleLike}>
            <p>Like</p>
            <Icon name="smile"/>
            </Button>
    )
}

export default LikeButton