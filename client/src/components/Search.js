import React from 'react';
import { Button, Form, Grid} from 'semantic-ui-react';
function Search(props) {
  return (
    <Form>
      <Grid columns={2}>
        <Grid.Column>
          <Form.Field>
            <Form.Input
              name="searchText"
              type="text"
              className="form-control"
              placeholder="Enter Genre"
              value={props.searchText}
              onChange={props.handleInputChange}
              onKeyPress={props.handleKeyPress}
            />
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Button className="ui primary button" onClick={props.handleSubmit}>
            Search Genre
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
}

export default Search;
