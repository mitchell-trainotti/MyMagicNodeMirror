const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

var citySchema = new mongoose.Schema({
    name:String,
    latitude: String, //N/S
    longitude: String //E/W
});

exports.getAllCities = async (req, res) =>{
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
}