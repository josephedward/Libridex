const express = require("express");
const logger = require("morgan");
const { join } = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
require("dotenv").config();
console.log(PORT);
process.env.NODE_ENV === "production"
  ? (axios.defaults.baseURL = "https://libridex.herokuapp.com/")
  : (axios.defaults.baseURL = `http://localhost:${PORT}/`);

console.log("axios.defaults.baseURL : ", axios.defaults.baseURL);

describe("Should return a book", () => {
  test("Get a book at random", async () => {
    const response = await axios.get("/api/audiobook/genre/science fiction");
    console.log(Object.keys(response.data));
    expect(Object.keys(response.data)).toStrictEqual(bookKeys)
  });
});

describe("Get a Specific Book", () => {
  test("Get The Count of Monte Cristo by ID", async () => {
    const response = await axios.get("/api/audiobook/book/47");
    //   console.log(Object.keys(response.data))
    expect(response.data.bkTitle).toBe("The Count of Monte Cristo");
  });
});

const bookKeys = [
  "bkID",
  "bkURL",
  "bkTitle",
  "bkRecs",
  "bkAuthor",
  "bkDescription",
  "bkImage",
  "CHS",
];
