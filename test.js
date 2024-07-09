// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://radar.cloudflare.com/charts/TrafficTrendsXY/fetch?');
 

  // Extract the JSON data from the <pre> element
  const pageContentJson = await page.$eval('pre', preElement => {
    // Assuming the JSON data is directly in the text content of the <pre> element
    return preElement.textContent.trim();
  });

  // Parse the JSON string to a JavaScript object
  const jsonData = JSON.parse(pageContentJson);

  // Save the JavaScript object to a file
  const fs = require('fs');
  fs.writeFileSync('page_content.json', JSON.stringify(jsonData, null, 2));
  console.log('Data saved');

  await browser.close();
});
