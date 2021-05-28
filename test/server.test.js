const express = require("express");
const logger = require("morgan");
const { join } = require("path");
const routes = require("../routes");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
require("dotenv").config();


console.log(PORT)
process.env.NODE_ENV === "production"? (axios.defaults.baseURL = "https://libridex.herokuapp.com/"):(axios.defaults.baseURL = `http://localhost:${PORT}/`)

describe("Test a 200", () => {
  test("It should respond with a 200 status", async () => {
    console.log(axios.defaults.baseURL)
    const response = await axios.get("/");
    expect(response.status).toBe(200);
  });
});
