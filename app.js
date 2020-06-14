require('dotenv').config();
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');
let port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./db/database');

app.set('view engine', 'ejs');

app.use(require('./routes'));
app.post(require('./routes'));

app.use(favicon(__dirname+'/public/favicon.ico'));

app.listen(port, () => {
    console.log("running at " + port);
});