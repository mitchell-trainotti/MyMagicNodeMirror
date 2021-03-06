const path = require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const fetch = require('node-fetch');

indexHomePath = path.join(__dirname, '/../public/view/indexHome.ejs');
indexDisplayPath = path.join(__dirname, '/../public/view/indexDisplay.ejs');

exports.renderHome = (req, res)=>{
    res.render(indexHomePath); 
}

exports.monitorRequests = (req, res, next)=>{
    console.log("Base Requests: " + req.url);
    next();
}

exports.renderDisplay = (req, res)=>{
    res.render(indexDisplayPath, {ID:"San Francisco"});   
}

exports.renderCustomDisplay = (req, res)=>{
    res.render(indexDisplayPath, {data:res.body});
}