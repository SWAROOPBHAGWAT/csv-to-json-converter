// src/app.js
const express = require('express');
const csvController = require('./controllers/csvController');

const app = express();
app.use(express.json());

app.post('/process-csv', csvController.processCsvAndReport);

module.exports = app; // <--- Crucial: Export the app instance