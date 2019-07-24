import React from "react";
import {List, Icon, Popup} from 'semantic-ui-react';

function UserLibrary(props){
    // console.log(props);
    return(
        <div className="layout scroll border"
        style={{ height: 200 }}
        >
            <h4>Books You Like</h4>
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



