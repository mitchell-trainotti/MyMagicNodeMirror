const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

exports.getWeather = async (req, res) =>{
    const api_url = process.env.API_KEY;
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);
}