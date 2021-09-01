const express = require('express');
const app = express();
const path = require('path');
// const multer = require('multer');
// const upload = multer();
const port = 3000;
const Utils = require('./lib/utils')

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));
app.listen(port);

app.post('/upload_json', function(req, res) {
  var dataStr = Utils.flatten(req.body);
  var filePath = path.join(__dirname, '/../data/csv_report.csv');
  Utils.create(filePath, dataStr, function(err, result) {
    if (err) {
      console.log('Error creating file: ', err);
      res.status(500).end();
    } else {
      console.log('File created');
      res.status(201).end();
    }
  });
})
app.get('/csv_report', function(req, res) {
  console.log('HELLO from get request');
  var filePath = path.join(__dirname, '/../data/csv_report.csv');
  res.download(filePath, function(err) {
    if (err) {
      console.log('Error downloading file: ', err);
    } else {
      console.log('File downloaded successfully!');
    }
  });
})