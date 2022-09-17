import React from "react";
import { Button, Icon } from "semantic-ui-react";

function NextButton(props) {
  return (
    <Button
      className="fullWidth center"
      color="blue"
      onClick={props.handleNext}
    >
      <p>Next</p>
    </Button>
  );
}

export default NextButton;
