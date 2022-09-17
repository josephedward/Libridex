import React from "react";
import { Item } from "semantic-ui-react";

function BookImage(props) {
  return (
    <Item
      style={{
        ...bookImageStyle,
        backgroundImage: `url(${props.image}) `,
        height: "400px", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize:
          "contain, cover",
      }}
    >
      <Item.Image
        size="large"
        style={{}}
      />
    </Item>
  );
}

export default BookImage;

const bookImageStyle = {
  zIndex: 2,
  width: "100%",
  height: "100%",
  margin: "auto",
};
