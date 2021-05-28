import React from "react";

function Author(props) {
  return (
    <div className="layout border">
      <h5>Author</h5>
      {props.author}
    </div>
  );
}

export default Author;
