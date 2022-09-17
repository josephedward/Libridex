import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

function ModalErr(props) {
  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      onClose={() =>props.getGenre(props.genre)}
      onOpen={() => setOpen(true)}
      open={open}
      onBlur={() => props.getGenre(props.genre)}
    //   closeOnTriggerBlur={false}
    //   trigger={<Button>Show Modal</Button>}
    >
      {/* <Modal.Header>Select a Photo</Modal.Header> */}
      <Modal.Content>
        <h3
        style={{color: "red"}}
        >{props.header}</h3>
        {/* <Image size='medium' src='/images/avatar/large/rachel.png' wrapped /> */}
        <Modal.Description>
           <h4> {props.content}</h4>
          {/* <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p> */}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={() => 
            // setOpen(false)
            }>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => 
            setOpen(false)}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
  );
}

export default ModalErr;
