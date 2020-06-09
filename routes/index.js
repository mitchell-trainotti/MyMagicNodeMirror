const express = require('express');
const router = express.Router();

const cityController = require('../controllers/city');
const renderController = require(__dirname + '/../controllers/render');
const weatherController = require(__dirname + '/../controllers/weather');

router.use('/staticFiles', express.static(__dirname + '/../public'), (req,res) => {});

router.get('/citydata', cityController.getAllCities);

router.use('/home', renderController.renderHome);
router.use('/display', renderController.renderDisplay);

router.get('/weatherdata', weatherController.getWeather);

module.exports = router;