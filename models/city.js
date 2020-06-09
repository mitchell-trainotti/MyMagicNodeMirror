const mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    name:String,
    latitude: String, //N/S
    longitude: String //E/W
});
city = mongoose.model('city', citySchema);

city.findAllCities = () => {
    return new Promise((resolve, reject) => {
        city.find({},(err, cities)=>{
            if(err) reject(err);
            resolve(cities);    
        });
    })
}

city.findCityByName = (name) => {
    city.find({name: name},(err, cities)=>{
        if(err) throw err;
        return cities;    
    });
}

module.exports = city;