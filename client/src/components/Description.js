import React from "react";

function Description(props) {
  return (
    <div className="layout border">
      <h5>Description</h5>
      <p>{props.description}</p>
    </div>
  );
}

export default Description;

