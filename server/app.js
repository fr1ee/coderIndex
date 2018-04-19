var express = require('express');
var multer = require('multer'); 
var app = express();
app.set('port', (process.env.PORT || 3000));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1024mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '1024mb', extended: true })); // for parsing application/x-www-form-urlencoded

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
var cpUpload = upload.any();
app.use(cpUpload);



module.exports = app;
