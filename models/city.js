const mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    _id:String,
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


city.editCity = (updatedCity, id) =>{
    return new Promise((resolve, reject) => {

        city.findOneAndUpdate({_id: id}, updatedCity, {useFindAndModify:false}, (err, updatedCity) => {
            if(err) reject(err);
            resolve(updatedCity);
        });
        
    });
}


module.exports = city;