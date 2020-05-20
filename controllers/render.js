const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

indexHomePath = path.join(__dirname, '/../public/view/indexHome.ejs');
indexDisplayPath = path.join(__dirname, '/../public/view/indexDisplay.ejs');


exports.renderHome = (req, res)=>{
    res.render(indexHomePath);
    console.log("Requests: " + req.url);
}

exports.renderDisplay = (req, res)=>{
    res.render(indexDisplayPath);
    console.log("Requests: " + req.url);
}