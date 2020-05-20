const express = require('express');
const app = express();
const fetch = require('node-fetch');
const favicon = require('serve-favicon');
const path = require('path');
require('dotenv').config();
app.use(require('./routes'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname+'/public/favicon.ico'));

app.use('/staticFiles', express.static(__dirname + '/public'), (req,res) => {
    console.log("asset call back");
});

indexHomePath = path.join(__dirname, '/public/view/indexHome.ejs');

app.use('/home', (req, res)=>{
    res.render(indexHomePath);
    console.log("Requests: " + req.url);
});

indexDisplayPath = path.join(__dirname, '/public/view/indexDisplay.ejs');

app.use('/display', (req, res)=>{
    res.render(indexDisplayPath);
    console.log("Requests: " + req.url);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("running at " + port);
    console.log("our path is "+__dirname);
});