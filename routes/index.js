const express = require('express');
const router = express.Router();

const cityController = require(__dirname + '/../controllers/city');
const renderController = require(__dirname + '/../controllers/render');
const weatherController = require(__dirname + '/../controllers/weather');




router.use('/staticFiles', express.static(__dirname + '/../public'), (req,res) => {});

router.get('/citydata', cityController.getAllCities);

//router.post('/newcity/:NAME,:LAT,:LON', cityController.postNewCity);
// router.use('/newcity', (req,res,next)=>{
//     console.log("success?");
//     next();
// });

router.get('/custom/:NAME,:LAT,:LON', renderController.renderCustomDisplay);

router.use('/weatherdata/:LAT,:LON', weatherController.getWeather);

router.get('/', renderController.renderHome);

router.use('/api/:NAME,:LAT,:LON', function(req, res, next){
    next();
});

router.post('/api/:NAME,:LAT,:LON', cityController.postCity);

router.put('/api/:id', cityController.putCity);

router.get('/', renderController.monitorRequests);

module.exports = router;