const cityModel = require('../models/city');
const mongoose = require('mongoose');
const cityController = () => {};



cityController.getAllCities = async (req, res) =>{
    cityModel.findAllCities()
    .then((cityData) => {
        res.status(200).send({
            status: 'Cities Retrieved',
            data: cityData
        });
    })
    .catch((err) => {
        next(err)
    })
}


// cityController.putCity() = async (req, res) =>{
//     cityModel.putCity()
//     .then(() => {
//         res.status(201).send({
//             status: 'Post written'
//         });
//     })
// }    



cityController.putCity = (req, res, next)=>{
    console.log(".putCity in progress");
    let updatedCity = {};
    if(req.body.name !== "") {
        updatedCity.name = req.body.name;
    }
    if(req.body.lat !== "") {
        updatedCity.lat = req.body.lat;
    }
    if(req.body.lon !== "") {
        updatedCity.lon = req.body.lon;
    }
    let id = req.body.id
    console.log("updatedCity: " + updatedCity.name , updatedCity.lon , updatedCity.lat, id);
    cityModel.editCity(updatedCity, id)
    .then((updatedCity) =>{
        //await updatedCity.save();
        res.status(200).send({
            status: 'City Updated',
            data: updatedCity
        });
    })
    .catch((err) => {
        next(err);
    })
}

 

module.exports = cityController;