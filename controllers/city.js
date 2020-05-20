module.exports = functions(app){


const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

var citySchema = new mongoose.Schema({
    name:String,
    latitude: String, //N/S
    longitude: String //E/W
});

getAllCities (){
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

// router.get('/weatherdata', async (req, res) =>{
//     const api_url = process.env.API_KEY;
//     const response = await fetch(api_url);
//     const json = await response.json();
//     res.json(json);
// });