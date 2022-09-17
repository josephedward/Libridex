import React from "react";
import { Item } from "semantic-ui-react";

function BookImage(props) {
  return (
    <Item

      style={{
        ...bookImageStyle,
        backgroundImage: `url(${props.image}) `,
        height: "400px", /* You must set a specified height */
        backgroundPosition: "center", /* Center the image */
        backgroundRepeat: "no-repeat", /* Do not repeat the image */
        backgroundSize: "contain, cover", /* Resize the background image to cover the entire container */
        
      }}
    >
      <Item.Image
        size="large"
        // src={props.image}
        style={{
          // ...bookImageStyle
        }}
      />
    </Item>
  );
}

export default BookImage;

const bookImageStyle = {
  // position: "absolute",
  zIndex: 2,
  width: "100%",
  height: "100%",
  margin: "auto",
  // top: -200,

};
