import React from "react";
import { Button, Form, Grid, Dropdown } from "semantic-ui-react";
function Search(props) {
  let genreOptions = [
    { key: "c", value: "c", text: "Comedy" },
    { key: "ho", value: "ho", text: "Horror" },
    { key: "hi", value: "hi", text: "Historical" },
    { key: "re", value: "re", text: "Religious" },
    { key: "sf", value: "sf", text: "Science Fiction" },
    { key: "ro", value: "ro", text: "Romance" }
  ];

  return (
    <Form>
      <Grid columns={2}>
        <Grid.Column>
          <Form.Field>
            <Form.Input
              name="searchText"
              type="text"
              placeholder="Enter Genre"
              // fluid
              // search={props.searchText}
              // selection={props.handleNext}
              list="genreOptions"
              className="form-control"
              value={props.searchText}
              onChange={props.handleInputChange}
              onKeyPress={props.handleKeyPress}
            />

            <datalist id="genreOptions">
              <option value="Comedy" />
              <option value="Adventure" />
              <option value="Science Fiction" />
              <option value="Horror" />
              <option value="Religious" />
              <option value="Nonfiction" />
              <option value="Romance" />
              <option value="Historical" />
            </datalist>
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
