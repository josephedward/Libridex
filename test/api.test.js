const express = require("express");
const logger = require("morgan");
const { join } = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const testObj1 = require("./testObj1")
require("dotenv").config();
console.log(PORT);
process.env.NODE_ENV === "production"
  ? (axios.defaults.baseURL = "https://libridex.herokuapp.com/")
  : (axios.defaults.baseURL = `http://localhost:${PORT}/`);

console.log("axios.defaults.baseURL : ", axios.defaults.baseURL);

describe("Should return a book", () => {
  test("Get a book at random", async () => {
    const response = await axios.get("/api/audiobook/genre/science fiction");
    // console.log(Object.keys(response.data));
    testBookStructure(response.data)
  });
});

describe("Get a Specific Book", () => {
  test("Get The Count of Monte Cristo by ID", async () => {
    const response = await axios.get("/api/audiobook/book/47");
    //   console.log(Object.keys(response.data))
    // expect(response.data.bkTitle).toBe("The Count of Monte Cristo");
    expect(response.data).toMatchObject(testObj1)
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

  // expect(bookRes).toMatchObject({
  //   bkID: expect.any(Number),
  //   bkURL: expect.any(URL),
  //   bkTitle: expect.any(String),
  //   bkRecs: expect.any(Array),
  //   bkAuthor: expect.any(String),
  //   bkDescription: expect.any(String),
  //   bkImage: expect.any(URL),
  //   CHS: expect.any(Array)
  // });
}
