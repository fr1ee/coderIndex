var express = require('express')
var multer = require('multer')
var app = express()
app.set('port', (process.env.PORT || 3000))
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '1024mb'})) // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '1024mb', extended: true })) // for parsing application/x-www-form-urlencoded

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })
var cpUpload = upload.any()
app.use(cpUpload)
// var app = require('express')();
app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
module.exports = app
