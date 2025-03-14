// src/app.js
const express = require('express');
const csvController = require('./controllers/csvController');
const multer = require('multer');

const app = express();
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },    
});

const upload = multer({ storage: storage });

app.post('/process-csv', upload.single('csvFile'), csvController.processCsvAndReport);

module.exports = app;