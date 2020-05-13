const express = require('express');
const app = express();
const fetch = require("node-fetch");
const favicon = require('serve-favicon');

app.use(favicon(__dirname+'/public/favicon.ico'));

app.get('/weather', async (req, res) =>{
const api_url = 'https://api.darksky.net/forecast/f8e0a1d7b2b6dcff1976aa1292e48d82/37.7749,-122.4194?exclude=minutely';
const response = await fetch(api_url);
const json = await response.json();
res.json(json);
});

let port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

const path = require('path');
indexPath = path.join(__dirname, '/public/view/index.ejs');

app.use('/staticFiles', express.static(__dirname + '/public'), (req,res) => {
    console.log("asset call back");
});

app.use('/', (req, res)=>{
    res.render(indexPath);
    console.log("Requests: " + req.url);
});

app.listen(port, () => {
    console.log("running at " + port);
    console.log("our path is "+__dirname);
});