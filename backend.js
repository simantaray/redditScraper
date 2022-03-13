"use strict";

const puppeteer = require("puppeteer");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/links", (req, res) => {

  let array = fs.readFileSync("links.txt", "utf8").split("\n");

  let subreddit = array[Math.floor(Math.random() * 21)];

  let subredditLink = `https://www.reddit.com/${subreddit}`;

  console.log(`connecting to ${subredditLink}`);
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(subredditLink);

    await page.waitForSelector(
      'button[class="i2sTp1duDdXdwoKi1l8ED _2iuoyPiKHN3kfOoeIQalDT _2tU8R9NTqhvBrhoNAXWWcP HNozj_dKjQZ59ZsfEegz8 _2nelDm85zKKmuD94NequP0"]'
    );

    await page.click(
      'button[class="i2sTp1duDdXdwoKi1l8ED _2iuoyPiKHN3kfOoeIQalDT _2tU8R9NTqhvBrhoNAXWWcP HNozj_dKjQZ59ZsfEegz8 _2nelDm85zKKmuD94NequP0"]'
    );

    await page.waitForSelector("body");

    await page.goto(subredditLink, {
      waitUntil: "networkidle0",
    });
    let links = await page.evaluate(async () => {
      window.scrollBy(0, document.body.clientHeight);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return [...document.querySelectorAll(".ImageBox-image")].map(
        (el) => el.src
      );
    });
    console.log(links);
    res.status(200).json(links);
  })();
});

app.listen(80, () => console.log("listing to 80"));
