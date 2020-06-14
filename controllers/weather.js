const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

exports.getWeather = async (req, res) =>{
    var api_url = "";
    var coordinates = req.params.COORDINATES;
    api_url = api_url.concat(process.env.API_KEY1, coordinates, process.env.API_KEY3);
    console.log(api_url);
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);
}