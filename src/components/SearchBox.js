import React from "react";

function SearchBox(props) {
  return (
    <datalist id="genreOptions">
      {props.genres.map((genre) => (
        <option value={genre} />
      ))}
    </datalist>
  );
}

export default SearchBox;
