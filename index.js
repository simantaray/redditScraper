"use strict";
const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const subReddits = require("./utils").subReddits
let subreddit = subReddits[Math.floor(Math.random() * 43)];
console.log(subreddit);

let url = `https://www.reddit.com/${subreddit}`;

const getLink = async () => {
  //init puppeteer
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const cookiesString = await fs.readFile('./cookies.json');
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);

  await page.goto(url);
  
  // const links = await page.evaluate(async () => {
  //   return [...document.querySelectorAll(".ImageBox-image")].map(
  //     element => element.src
  //   );
  // });
  const links = await page.evaluate(async () => {
    return document.querySelector(".ImageBox-image").getAttribute('src')
  });
  
  return links;
};

const link = getLink();
link.then((result) => result).then((data) => console.log(data));
