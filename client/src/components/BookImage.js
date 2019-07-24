import React from 'react';
import {Item} from 'semantic-ui-react';

function BookImage(props){

return(
    <Item>
    <Item.Content verticalAlign="middle" className="layout tanish">
    <Item.Image  alt="book pic" src={props.image}/>
    </Item.Content>
    </Item>
)    


}
export default BookImage;