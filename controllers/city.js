const cityModel = require('../models/city');

const cityController = () => {};

cityController.getAllCities = async (req, res, next) =>{
    cityModel.findAllCities()
    .then((cityData) => {
        res.status(200).send({
            status: 'Ok',
            data: cityData
        });
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = cityController;