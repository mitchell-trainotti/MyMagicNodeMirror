const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
require('dotenv').config();
app.set('view engine', 'ejs');

app.use(require('./routes'));

app.use(favicon(__dirname+'/public/favicon.ico'));

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("running at " + port);
    console.log("our path is "+__dirname);
});