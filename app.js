var express = require('express');
var path = require('path');
var app = express();

// Load CSS and JS from public folder
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));

  //res.send('The / directory! Sent index.html here');
});

var server = app.listen(3000, function () {
  console.log('Listening on port 3000');
});