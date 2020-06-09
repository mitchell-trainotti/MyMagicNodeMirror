require('dotenv').config();
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
let port = process.env.PORT || 3000;

require('./db/database');

app.use(require('./routes'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname+'/public/favicon.ico'));


app.listen(port, () => {
    console.log("running at " + port);
    console.log("our path is "+__dirname);
});