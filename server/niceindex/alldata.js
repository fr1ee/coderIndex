var fs = require('fs')
var app = require('../app')
const path = require('path')

var indexDataFile = path.join(__dirname, 'webs.data.json')

app.get('/api/niceindex/all', function (req, res) {
  let allwebs = JSON.parse(fs.readFileSync(indexDataFile, 'utf-8'))
  res.send(allwebs)
})
