import React from "react";
import {
  Button,
  Form,
  Grid
  //  Dropdown
} from "semantic-ui-react";
// import axios from "axios";
// import fs from "fs";
import cheerio from "cheerio";
import $ from "jquery";
// https://librivox.org/search?primary_key=0&search_category=genre&search_page=1&search_form=get_results
// class Search extends React.Component {

// var Option = React.createClass({
//   render: function() {
//       return getGenres().map(elem =>
//           <option value={elem}>{elem}</option>
//       )
//       }
//   })

function Search(props) {
  // state={
  //   genres:[]
  // }

  // componentDidMount(){

  //   this.getGenres();
  // }

  // render(props){

  function getGenres() {
    let gList = [];
    $.getJSON(
      "http://www.whateverorigin.org/get?url=" +
        encodeURIComponent(
          "http://librivox.org/search?primary_key=0&search_category=genre&search_page=1&search_form=get_results"
        ) +
        "&callback=?",
      function(data) {
        // alert(data.contents);
        let $cl = cheerio.load(data.contents);
        // console.log($cl.html());
        $cl("option").each(function(i, element) {
          // if(i<144){
          if (i < 144)
            gList.push(
              // `<option value=${$cl(element).text()}>${$cl(element).text()}</option>`)
              $cl(element).text());
          // }
        });
        // console.log(gList);
        return gList;
      }
    );
    // console.log(gList);
    // this.setState({genres:gList})

    // $("#genreOptions").append(gList.join())
    return gList;
  }

  let genres = getGenres();
  let gOptions= genres.map(
    (genre) =>
  {return <option value={genre}/>}
  );

  return (
    <Form>
      <Grid columns={2}>
        <Grid.Column>
          <Form.Field>
            {/* {getGenres()} */}

            <Form.Input
              name="searchText"
              type="text"
              placeholder="Enter Genre"
              // fluid
              // search={props.searchText}
              // selection={props.handleNext}
              list="genreOptions" re
              className="form-control"
              value={props.searchText}
              onChange={props.handleInputChange}
              onKeyPress={props.handleKeyPress}
            />

            {
              <datalist id="genreOptions">
                {/* {genres.map((item, key) => 
                { return <option key={key} value={item} />}
                )} */}

                {gOptions}
              </datalist>
            }
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
  // }
}

export default Search;
