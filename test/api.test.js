const express = require("express");
const logger = require("morgan");
const { join } = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const api = require("../service/api")
const books = require("../service/book-scrape")
// import testObj1 from "./testObj1"
const testObj1 = require("./testObj1")

// ./node_modules/.bin/jest --updateSnapshot 


require("dotenv").config();
console.log(PORT);
process.env.NODE_ENV === "production"
  ? (axios.defaults.baseURL = "https://libridex.herokuapp.com/")
  : (axios.defaults.baseURL = `http://localhost:${PORT}/`);

console.log("axios.defaults.baseURL : ", axios.defaults.baseURL);

// describe("Should return a book", () => {
//   test("Get a book at random", async () => {
//     const response = await axios.get("/api/audiobook/genre/science fiction");
//     // console.log(Object.keys(response.data));
//     testBookStructure(response.data)
//   });
// });

describe("Get a Specific Book", () => {
  test("Return Greener Than You Think", async () => {
    const response = await axios.get("/api/audiobook/book/1459");
    expect(response.data).toMatchObject(testObj1[0])

  });
});

function testBookStructure(bookRes) {
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

  expect(Object.keys(bookRes)).toStrictEqual(bookKeys);

  expect(bookRes).toMatchObject({
    CHS: expect.any(Array),
    bkAuthor: expect.any(String),
    bkDescription: expect.any(String),
    bkImage: expect.any(URL),
    bkID: expect.any(Number),
    bkRecs: expect.any(Array),
    bkTitle: expect.any(String),
    bkURL: expect.any(URL)
  });
}
