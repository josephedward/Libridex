import React from "react";
import {List, Icon, Popup} from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom'  
function loadLibrary() {
    window.location.replace('../Library')
}



function UserLibrary(props){
    // console.log(props);
    return(
        <div className="layout scroll border"
        style={{ height: 200 }}
        >
            <h4 onClick={() => loadLibrary()}>Books You Like
                {/* <a href="../Library">
                 Books You Like</a> */}
                 </h4>
           <List >
            {props.books && props.books.map(book => 
            <List.Item key={book.bkTitle}>
            <Popup content="Get Random Chapter of this Book" trigger={
                <List.Header onClick={() => props.getSpecificBook(book.bkID)}>
                {book.bkTitle.trim()}
                </List.Header>
            }/>
            
            {book.bkAuthor.trim()}

            <Icon color='red' name='delete' className="floatleft" onClick={() => props.deleteBook(book.bkTitle)} />
            </List.Item>)}
            </List>
        </div>
    )
}

export default UserLibrary;



