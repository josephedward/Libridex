import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";

function Search(props) {
  return (
    <Form>
      <Grid columns={2}>
        <Grid.Column>
          <Form.Field>
            <Form.Input
              name="searchText"
              type="text"
              placeholder="Enter Genre"
              list="genreOptions"
              className="form-control"
              value={props.searchText}
              onChange={props.handleInputChange}
              onKeyPress={props.handleKeyPress}
            />
            <datalist id="genreOptions">
              <option value="Philosophy">Philosophy</option>
              <option value="Westerns">Westerns</option>
              <option value="Science">Science</option>
              <option value="Plays">Plays</option>
              <option value="History">History</option>
              <option value="Poetry">Poetry</option>
              <option value="Nature">Nature</option>
              <option value="Psychology">Psychology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Religion">Religion</option>
              <option value="Education">Education</option>
              <option value="Exploration">Exploration</option>
              <option value="Romance">Romance</option>
              <option value="Sagas">Sagas</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Satire">Satire</option>
              <option value="Drama">Drama</option>
              <option value="Humor">Humor</option>
              <option value="Music">Music</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Family">Family</option>
              <option value="Epics">Epics</option>
              <option value="Law">Law</option>
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
