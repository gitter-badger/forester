var express = require('express');
var path = require('path');
var app = express();

// Load CSS and JS from public folder
app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

var server = app.listen(process.env.PORT || 3000)