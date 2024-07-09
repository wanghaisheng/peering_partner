const express = require("express");
require('dotenv').config();
const { TrafficVolumeXY } = require("./charts/TrafficVolumeXY/fetch");
const { BgpRoutesStatsCard } = require("./charts/BgpRoutesStatsCard/fetch");
const { BgpRoutesRpkiHalfDonut } = require("./charts/BgpRoutesRpkiHalfDonut/fetch");
const { BgpRoutesIpv6HalfDonut } = require("./charts/BgpRoutesIpv6HalfDonut/fetch");
const { BgpRouteLeaksTable } = require("./charts/BgpRouteLeaksTable/fetch");
const { BgpRoutesMoasTable } = require("./charts/BgpRoutesMoasTable/fetch");
const { BgpHijacksTable } = require("./charts/BgpHijacksTable/fetch");
const { TopAsnList } = require("./charts/TopAsnList/fetch");
const { Layer7AttacksBubble } = require("./charts/Layer7AttacksBubble/fetch");
const { Layer34AttacksBubble } = require("./charts/Layer34AttacksBubble/fetch");
const { IpVersionBubble } = require("./charts/IpVersionBubble/fetch");
const { HttpVersionBubble } = require("./charts/HttpVersionBubble/fetch");
const { TrafficTrendsXY } = require("./charts/TrafficTrendsXY/fetch");
const { allCountries } = require("./charts/allCountries/fetch");
const { fetchCountries } = require("./charts/allCountries/fetch");
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 4000;

// Define a function to handle errors
const handleErrors = (res, error) => {
  console.error(error);
  res.status(404).json({ error: 'Not Found' });
};

//traffic Page
app.get("/charts/TrafficVolumeXY/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    TrafficVolumeXY(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/TrafficTrendsXY/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    TrafficTrendsXY(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/TopAsnList/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    TopAsnList(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});
app.get("/charts/allCountries", (req, res) => {

  try {
    allCountries(req, res);
  } catch (error) {
    handleErrors(res, error);
  }

});
app.get("/charts/fetchCountries", (req, res) => {
  try {
    fetchCountries(req, res);
  } catch (error) {
    handleErrors(res, error);
  }
});

app.get("/charts/Layer7AttacksBubble/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    Layer7AttacksBubble(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/Layer34AttacksBubble/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    Layer34AttacksBubble(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/IpVersionBubble/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    IpVersionBubble(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/HttpVersionBubble/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    HttpVersionBubble(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});


//routing Page
app.get("/charts/BgpRoutesStatsCard/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    BgpRoutesStatsCard(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/BgpRoutesRpkiHalfDonut/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    BgpRoutesRpkiHalfDonut(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/BgpRoutesIpv6HalfDonut/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    BgpRoutesIpv6HalfDonut(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/BgpRouteLeaksTable/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    BgpRouteLeaksTable(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/BgpRoutesMoasTable/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    BgpRoutesMoasTable(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});

app.get("/charts/BgpHijacksTable/fetch", (req, res) => {

  try {
    const { location, dateStart, dateEnd } = req.query;

    BgpHijacksTable(req, res, location, dateStart, dateEnd);
  } catch (error) {
    handleErrors(res, error);
  }

});


app.get("/", (req, res) => {
  res.send("Render Peering Partner server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
