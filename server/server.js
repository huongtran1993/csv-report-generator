const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
var uploadedfilePath = path.join(__dirname, '/../uploads/');
const upload = multer();
const port = 3000;
const Utils = require('./lib/utils')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/../client'));
app.listen(port);

app.post('/upload_json', upload.single('data-input'), function(req, res) {
  var dataStr = Utils.flatten(JSON.parse(req.file.buffer));
  var filePath = path.join(__dirname, '/../data/csv_report.csv');
  console.log(filePath);
  Utils.create(filePath, dataStr, function(err, result) {
    if (err) {
      console.log('Error creating file: ', err);
      res.status(500);
    } else {
      console.log('File created');
      res.status(201).render('index');
    }
  });
})
app.get('/csv_report', function(req, res) {
  var filePath = path.join(__dirname, '/../data/csv_report.csv');
  res.sendFile(filePath);
})