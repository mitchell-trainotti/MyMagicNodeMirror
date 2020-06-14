const express = require('express');
const router = express.Router();

const cityController = require(__dirname + '/../controllers/city');
const renderController = require(__dirname + '/../controllers/render');
const weatherController = require(__dirname + '/../controllers/weather');


router.use('/staticFiles', express.static(__dirname + '/../public'), (req,res) => {});

router.get('/citydata', cityController.getAllCities);


router.get('/custom/:NAME', renderController.renderCustomDisplay);

router.use('/weatherdata/:COORDINATES', weatherController.getWeather);

router.get('/', renderController.renderHome);

router.put('/editCity', cityController.putCity);

router.get('/', renderController.monitorRequests);

module.exports = router;