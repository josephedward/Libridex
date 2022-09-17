import React from "react";
import {
  Button,
  Form,
  Grid
} from "semantic-ui-react";

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
              {/* <option value="Children's Fiction">Children's Fiction</option>
              <option value="Dramatic Readings">Dramatic Readings</option>
              <option value="Epistolary Fiction">Epistolary Fiction</option> */}
              {/* <option value="Erotica">Erotica</option> */}
              {/* 
              <option value="Family Life">Family Life</option>
              <option value="Fantastic Fiction">Fantastic Fiction</option>
              <option value="General Fiction">General Fiction</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Humorous Fiction">Humorous Fiction</option>
              <option value="Literary Fiction">Literary Fiction</option> */}
              {/* <option value="Fiction">Fiction</option>
              <option value="Nonfiction">Nonfiction</option> */}
              <option value="Westerns">Westerns</option>
              <option value="Science">Science</option>
              <option value="Plays">Plays</option>
              <option value="Poetry">Poetry</option>
              <option value="Religion">Religion</option>
              <option value="Romance">Romance</option>
              <option value="Sagas">Sagas</option>
              <option value="Satire">Satire</option>
              <option value="Humor">Humor</option>
              {/* <option value="Travel">Travel</option> */}
              {/* <option value="Short Stories">Short Stories</option> */}
              {/* <option value="Science Fiction">Science Fiction</option> */}
              {/* <option value="Sports Fiction">Sports Fiction</option> */}
              
              {/* <option value="English">English</option>
              <option value="French">French</option>
              <option value="German">German</option> */}
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

 