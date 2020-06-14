const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

exports.getWeather = async (req, res) =>{
    var api_url = "";
    var coordinates = req.params.COORDINATES;
    api_url = api_url.concat("https://api.darksky.net/forecast/", process.env.API_KEY, '/', coordinates);
    console.log(api_url);
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);
}