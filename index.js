'use strict';
const https = require('https');
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");


let array = fs.readFileSync('links.txt', 'utf8').split('\n');

let subreddit=array[Math.floor(Math.random() * 21)]

let subredditLink=`https://www.reddit.com/${subreddit}`

console.log(subredditLink);

//puppeteer

(async () => {
  const browser = await puppeteer.launch({ headless: false });
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
  const links = await page.evaluate(async () => {
    window.scrollBy(0, document.body.clientHeight);
    await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for some time, you might need to figure out a good value for this yourself
    // return [...document.querySelectorAll('.scrollerItem div:nth-of-type(2) article div:nth-of-type(2) div:nth-of-type(2) a')]
    return [...document.querySelectorAll(".ImageBox-image")].map(
      (el) => el.src
    );
  });
  console.log(links);
  for (let i = 0; i < links.length; i++) {
   let result = await download(links[i], `image-${i}.png`);

    if (result === true) {
      console.log("Success:", links[i], "has been downloaded successfully.");
    } else {
      console.log("Error:", links[i], "was not downloaded.");
      console.error(result);
    }
  }
})();

const download = (url, destination) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve(true));
        });
      })
      .on("error", (error) => {
        fs.unlink(destination);

        reject(error.message);
      });
  });

