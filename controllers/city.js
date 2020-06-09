const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

mongoose.set('useFindAndModify', false);

var citySchema = new mongoose.Schema({
 //   _id:Object,
    name:String,
    latitude: String, //N/S
    longitude: String //E/W
});

var city = mongoose.model('city', citySchema);

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

exports.getAllCities = async (req, res) =>{

    city = mongoose.model('city', citySchema);
    city.find((err, cities)=>{
    res.json(cities);});
}


exports.postCity = async (req, res) =>{
    console.log("post called");
    var newCity = new city({name:req.params.NAME, latitude: req.params.LAT, longitude: req.params.LON});

    newCity
        .save()
        .then(result => {
            console.log("newCity save result: " + result);
        })
        .catch (err => console.log(err));
    res.status(201).json({
        message: 'Handling POST request',
        createdProduct: newCity
    })

}


exports.putCity = (req, res)=>{     
    const mongoUrl = process.env.DB_URL;
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;  

    console.log("put request called");
    let newCity = {};
    newCity.name = "new name";

    city.update({name:"test object"}, newCity, function(err){
    
    if(err){
        console.log(err);
    return;
    } else {
        res.send("you made it");
    }

        console.log("in callback");
    });
};
