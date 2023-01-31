/*
    Udacity - Front-End Web Developer Nanodegree
    By: Florian Wollenschein
    January 2023
*/

const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

// API Key (dotenv)
const apiKey = process.env.API_KEY;

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
const server = app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
    console.log('Your api key is: ', apiKey);
});

// API call
const apiCall = async (req, res) => {
    const userInput = req.body.formText;

    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=auto&txt=${userInput}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
};

app.post('/apiCall', apiCall);

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});
