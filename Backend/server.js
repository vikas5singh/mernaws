const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });
const db = require('./db/db');
const app = express();
const data = require('./models/users');
const routeapi = require('./routes/route');
const path = require("path");
var cors = require('cors');
// globaly
app.use(bodyParser.urlencoded({extended: false})); // handle the incomming request to parsing 
app.use(bodyParser.json()); // handle the middle 
const buildPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(buildPath));
console.log('Full path:', buildPath);

//Database configration
mongoose.set('strictQuery', false);
mongoose.connect(db.DB, {useNewUrlParser: true}).then(()=>{
console.log('Database is sucessfull connect');
}).catch(err=>{console.log('Connection :'+err);});
// Basic routes
app.use('/api', routeapi);
app.use(express.static('public')); 
app.use('/images', express.static('images'));
// heroku prodduction setup

//Server is creating on the port
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
console.log(`Server is runnin on the Port :${port}`);
})
