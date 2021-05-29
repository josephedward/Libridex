const express = require("express");
const logger = require("morgan");
const { join } = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
require("dotenv").config();
console.log(PORT)
process.env.NODE_ENV === "production"? (axios.defaults.baseURL = "https://libridex.herokuapp.com/"):(axios.defaults.baseURL = `http://localhost:${PORT}/`)

describe("Get The Count of Monte Cristo by ID", () => {
    test("It should respond with a 200 status", async () => {
      console.log(axios.defaults.baseURL)
      const response = await axios.get("/api/audiobook/book/47");
      //   console.log(Object.keys(response.data))
        expect(response.data.bkTitle).toBe("The Count of Monte Cristo");
    });
  });
  
  