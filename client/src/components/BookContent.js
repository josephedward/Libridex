import React from 'react';
import { List, 
  // Icon, Popup
 } from 'semantic-ui-react';

function BookContent(props) {
  return (
    <div className="layout scroll border" style={{ height: 200 }}>
      <h4>{props.book && props.book.bkTitle}</h4>
      <List>
        {props.book.CHS &&
          props.book.CHS.map(chapter => (
            <List.Item key={chapter.chTitle.trim()}
            onClick={() =>                 
                // console.log("clicked")
                props.setChapter(chapter)
            }
            >
              {chapter.chTitle.trim()}
            </List.Item>
          ))}
      </List>
    </div>
  );
}

export default BookContent;
