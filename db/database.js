const mongoose = require('mongoose');

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        console.log("Connected to database.")
    }, err => {
        console.log(err);
        throw err;
    })

mongoose.Promise = global.Promise;