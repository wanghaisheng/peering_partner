const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const express = require('express');
require('dotenv').config();
puppeteer.use(StealthPlugin());
const countries=require('../../models/allcountries')
const { connectDB } = require('../../db');
connectDB();


const fetchCountries = async (req, res) => {


  let url = 'https://bgpview.io/reports/countries';

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

      await page.goto(url);

      const alldata = await page.$eval('table', (table) => {
        const jsonData = [];

        // Get all rows in the table
        const rows = table.querySelectorAll('tr');

        // Iterate through each row
        rows.forEach((row) => {
          const rowData = {};
          const cells = row.querySelectorAll('td');

          cells.forEach((cell, index) => {
            const originalHeaderText = table.querySelector('th:nth-child(' + (index + 1) + ')').innerText.trim();
            let headerText = originalHeaderText.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
            if (headerText == 'Country') {
              headerText = 'country_code'
            } else if (headerText === 'Allocated_ASNs') {
              headerText = 'allocated_asn_count'


            } else if (headerText === 'Allocated_IPv4_Prefixes') {

              headerText = 'allocated_ipv4_prefix_count'

            } else if (headerText === 'Allocated_IPv6_Prefixes') {
              headerText = 'allocated_ipv6_prefix_count'

            } else if (headerText === 'Allocated_IPv4_Addresses') {
              headerText = 'allocated_ipv4_ip_count'
            }
            const image = cell.querySelector('a');
            if (image) {
              const url = cell.querySelector('img');
              const countryCode = url?.src?.match(/\/([A-Z]{2})\.png$/)[1];
              rowData[headerText] = countryCode;
            } else {
              rowData[headerText] = cell.innerText.trim();
            }
          });
          jsonData.push(rowData);
        });
        return jsonData;
      });
      await browser.close()
      store_db(alldata);
      res.send(alldata);
    });
}
const store_db=(data)=>{
  data.forEach(async (entry) => {
    console.log("Whats in entry"  , entry )
    try {
      if(entry){
        const filter = { country_code: entry.country_code };
        const update = { $set: entry };
        const options = { upsert: true, new: true, runValidators: true };

         await countries.updateOne(filter, update, options);
      }
    } catch (error) {console.log('eeee',error)}
  })
}
const allCountries=async(req,res)=>{
  const data = await countries.find({});
  const response={
    data
  };
  res.send(response);
}
module.exports = { allCountries ,fetchCountries};
