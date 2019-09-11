/**
 * Created by free on 16/11/5.
 */
var fs = require("fs"); 
var app = require('../app');

var signStoryDataFile1 = __dirname + "/" + "signStory.data.json";//渠道(网站、线路、客户端)
var signStoryDataFile2 = __dirname + "/" + "signStory2.data.json";//渠道(微博、微信、海媒)
var signStoryDataFile3 = __dirname + "/" + "signStory3.data.json";//栏目(网站栏目[树，取得无数级递归]、线路栏目[取得一级]、客户端栏目[取得一级])
var signStoryDataFile4 = __dirname + "/" + "signStory4.data.json";//稿件信息

app.post('/apis/signStory/getGroup', function (req, res) {
    var result = JSON.parse(fs.readFileSync(signStoryDataFile1, 'utf-8'));
    res.send(result);
});

app.post('/apis/signStory/getOperate', function (req, res) {
    var result = JSON.parse(fs.readFileSync(signStoryDataFile2, 'utf-8'));
    res.send(result);
});

app.post('/apis/signStory/getColumn', function (req, res) {
    var result = JSON.parse(fs.readFileSync(signStoryDataFile3, 'utf-8'));
    res.send(result);
});

app.post('/apis/signStory/getSignStoryDoc', function (req, res) {
    var result = JSON.parse(fs.readFileSync(signStoryDataFile4, 'utf-8'));
    res.send(result);
});

app.post('/apis/signStory/setSignStoryDoc', function (req, res) {
    var result = JSON.parse(fs.readFileSync(signStoryDataFile4, 'utf-8'));
    res.send(result);
});



