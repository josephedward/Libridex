import React from 'react';
import { Button, Form, Grid, Dropdown} from 'semantic-ui-react';
function Search(props) {


  let genreOptions=[
    {key: "c", value: 'c', text: "Comedy"},
    {key: "ho", value: 'ho', text: "Horror"},
    {key: "hi", value: 'hi', text: "Historical"},
    {key: "re", value: 're', text: "Religious"},
    {key: "sf", value: 'sf', text: "Science Fiction"},
    {key: "ro", value: 'ro', text: "Romance"},



  ]

  return (
    <Form>
      <Grid columns={2}>
        <Grid.Column>
          <Form.Field>
            <Dropdown
              name="searchText"
              type="text"
              fluid
              search
              selection
              options={genreOptions}
              className="form-control"
              placeholder="Enter Genre"
              value={props.searchText}
              onChange={props.handleInputChange}
              onKeyPress={props.handleKeyPress}
            />
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Button className="ui primary button" onClick={props.handleNext}>
            Search Genre
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
}

export default Search;
