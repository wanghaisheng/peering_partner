const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const express = require('express');
require('dotenv').config();

puppeteer.use(StealthPlugin());

const TopAsnList = async (req, res, location, dateStart, dateEnd) => {
  

  // Build the base URL
  let url = 'https://radar.cloudflare.com/charts/TopAsnList/fetch?';

  // Conditionally add parameters to the URL if they exist
  if (location && location.toLowerCase() !== "worldwide") {
    url += `location=${location}&`;
  }
  if (dateStart) url += `dateStart=${dateStart}&`;
  if (dateEnd) url += `dateEnd=${dateEnd}&`;

  // Remove trailing '&' if any
  url = url.replace(/&$/, '');


  // puppeteer usage as normal
  puppeteer
    .launch({
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
      ],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    })
    .then(async (browser) => {
      const page = await browser.newPage();

      // Use the final URL
      await page.goto(url);

      // Extract the JSON data from the <pre> element
      const pageContentJson = await page.$eval('pre', (preElement) => {
        // Assuming the JSON data is directly in the text content of the <pre> element
        return preElement.textContent.trim();
      });

      // Parse the JSON string to a JavaScript object
      const jsonData = JSON.parse(pageContentJson);

      res.send(jsonData);

      await browser.close();
    });
};

module.exports = { TopAsnList };
