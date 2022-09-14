const axios = require("axios");
const _ = require("lodash");
const cheerio = require("cheerio");
const chalk = require("chalk");
const router = require("express").Router();
const csv = require("csvtojson");
let book = {};
const csvFilePath = "./data/denormalized_scrape_match_v3-3.csv";
// import { Handler } from '@netlify/functions'


// exports.handler = async function (event, context) {
//     // your server-side functionality
//     let id =event.queryStringParameters.id
//     console.log("id : ",id);
//     // try {
//     return await searchGenre(id).then((bookData) => res.json(bookData));
//     // } catch (err) {
//     //   console.log(err.message);
//     // }
//   };

// const handler = async (event) => {
//   let id =event.queryStringParameters.id
//   console.log("id : ",id);

//   return
// }


const handler = async function (event) {

  console.log("event : ",event);

  // let id =event.queryStringParameters.id
  //   console.log("id : ",id);

  // try {
  //   const response = await searchGenre(id).then((bookData) => res.json(bookData))

  //   if (!response.ok) {
  //     // NOT res.status >= 200 && res.status < 300
  //     return { statusCode: response.status, body: response.statusText }
  //   }
  //   const data = await response.json()

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ msg: data }),
  //   }
  // } catch (error) {
  //   // output to netlify function log
  //   console.log(error)
  //   return {
  //     statusCode: 500,
  //     // Could be a custom message or object i.e. JSON.stringify(err)
  //     body: JSON.stringify({ msg: error.message }),
  //   }
  // }
}