const express = require('express');
const router = express.Router();

const cityController = require(__dirname + '/../controllers/city');
const renderController = require(__dirname + '/../controllers/render');
const weatherController = require(__dirname + '/../controllers/weather');

router.use('/staticFiles', express.static(__dirname + '/../public'), (req,res) => {});

router.get('/citydata', cityController.getAllCities);

router.use('/custom/:NAME,:LAT,:LON', renderController.renderCustomDisplay);

router.get('/weatherdata/:LAT,:LON', weatherController.getWeather);

router.use('/', renderController.renderHome);

module.exports = router;