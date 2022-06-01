const express = require('express');
const cors = require('cors');
const app = express();
require('./dbConnect')


//settings

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/route 1', (req, res) => res.send('Json routes 1'))
app.get('/route 2', (req, res) => res.send('Json routes 2'))

module.exports = app;