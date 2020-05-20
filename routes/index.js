const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');


var citySchema = new mongoose.Schema({
    name:String,
    latitude: String, //N/S
    longitude: String //E/W
});

router.get('/citydata', async (req, res) =>{
    const mongoUrl = process.env.DB_URL;
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () =>{

        city = mongoose.model('city', citySchema);
        city.find((err, cities)=>{
            res.json(cities);
        });
    });
});

router.get('/weatherdata', async (req, res) =>{
    const api_url = process.env.API_KEY;
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);
});


// router.use('/staticFiles', express.static('/../public'), (req,res) => {
//     console.log("asset call back");
// });

// indexHomePath = '/../public/view/indexHome.ejs';

// router.use('/home', (req, res)=>{
//     res.render(indexHomePath);
//     console.log("Requests: " + req.url);
// });

// indexDisplayPath = '/../public/view/indexDisplay.ejs';

// router.use('/display', (req, res)=>{
//     res.render(indexDisplayPath);
//     console.log("Requests: " + req.url);
// });


module.exports = router;
