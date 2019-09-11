/**
 * Created by free on 16/11/5.
 */
var fs = require("fs"); 
var app = require('../app');

//用户信息
var userInfomationDataFile = __dirname + "/" + "userinfomation.data.json";
//落地统计信息
var loadStatisticDataFile = __dirname + "/" + "loadstatistic.data.json";
//稿件影响力初始化(网媒)信息
var mineNetWorkMediaDataFile = __dirname + "/" + "mine-networkmedia.data.json";
//稿件影响力新媒信息
var mineNewMediaDataFile = __dirname + "/" + "mine-newmedia.data.json";
//稿件影响力海媒信息
var mineSeaMediaDataFile = __dirname + "/" + "mine-seamedia.data.json";
//本部门的网媒信息
var departmentNetWorkMediaDataFile = __dirname + "/" + "department-networkmedia.data.json";
//本部门的新媒信息
var departmentNewMediaDataFile = __dirname + "/" + "department-newmedia.data.json";
//本部门的海媒信息
var departmentSeaMediaDataFile = __dirname + "/" + "department-seamedia.data.json";
//全社的网媒信息
var companyNetWorkMediaDataFile = __dirname + "/" + "company-networkmedia.data.json";
//全社的新媒信息
var companyNewMediaDataFile = __dirname + "/" + "company-newmedia.data.json";
//全社的海媒信息
var companySeaMediaDataFile = __dirname + "/" + "company-seamedia.data.json";
//稿件的发稿量和采用量
var publishManuScriptDataFile = __dirname + "/" + "publishmanuscript.data.json";
//代办事项和值班信息
var waitDutyDataFile = __dirname + "/" + "wait-duty.data.json";
//报道墙信息
var reportWallDataFile = __dirname + "/" + "report-wall.data.json";
//分享墙信息
var shareWallDataFile = __dirname + "/" + "shared-wall.data.json";
//舆情与线索信息
var opinionClueDataFile = __dirname + "/" + "opinion-clue.data.json";
//新闻图片信息
var newsFrameDataFile = __dirname + "/" + "news-frame.data.json";
//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

//获取用户登录门户的信息
app.get('/apis/gateway/userinfo', function (req, res) {
  var userinfo = JSON.parse(fs.readFileSync(userInfomationDataFile, 'utf-8'));
  res.send(userinfo);
});

//获取落地统计的热点信息 
app.get('/apis/gateway/loadstatistic', function (req, res) {
  var loadstatistic = JSON.parse(fs.readFileSync(loadStatisticDataFile, 'utf-8'));
  res.send(loadstatistic);
});


//获取我的网媒的稿件影响力的信息  稿件影响力初始化取得的数据
app.get('/apis/gateway/mine/netWorkMedia', function (req, res) {
  var netWorkMedia = JSON.parse(fs.readFileSync(mineNetWorkMediaDataFile, 'utf-8'));
  res.send(netWorkMedia);
});

//获取我的新媒的稿件影响力的信息
app.get('/apis/gateway/mine/newMedia', function (req, res) {
  var newMedia = JSON.parse(fs.readFileSync(mineNewMediaDataFile, 'utf-8'));
  res.send(newMedia);
});

//获取我的海媒的稿件影响力的信息
app.get('/apis/gateway/mine/seaMedia', function (req, res) {
  var seaMedia = JSON.parse(fs.readFileSync(mineSeaMediaDataFile, 'utf-8'));
  res.send(seaMedia);
});

//获取本部门的网媒的稿件影响力的信息
app.get('/apis/gateway/department/netWorkMedia', function (req, res) {
  var netWorkMedia = JSON.parse(fs.readFileSync(departmentNetWorkMediaDataFile, 'utf-8'));
  res.send(netWorkMedia);
});

//获取本部门的新媒的稿件影响力的信息
app.get('/apis/gateway/department/newMedia', function (req, res) {
  var newMedia = JSON.parse(fs.readFileSync(departmentNewMediaDataFile, 'utf-8'));
  res.send(newMedia);
});

//获取本部门的海媒的稿件影响力的信息
app.get('/apis/gateway/department/seaMedia', function (req, res) {
  var seaMedia = JSON.parse(fs.readFileSync(departmentSeaMediaDataFile, 'utf-8'));
  res.send(seaMedia);
});

//获取全社的网媒的稿件影响力的信息
app.get('/apis/gateway/company/netWorkMedia', function (req, res) {
  var netWorkMedia = JSON.parse(fs.readFileSync(companyNetWorkMediaDataFile, 'utf-8'));
  res.send(netWorkMedia);
});

//获取全社的新媒的稿件影响力的信息
app.get('/apis/gateway/company/newMedia', function (req, res) {
  var newMedia = JSON.parse(fs.readFileSync(companyNewMediaDataFile, 'utf-8'));
  res.send(newMedia);
});

//获取全社的海媒的稿件影响力的信息
app.get('/apis/gateway/company/seaMedia', function (req, res) {
  var seaMedia = JSON.parse(fs.readFileSync(companySeaMediaDataFile, 'utf-8'));
  res.send(seaMedia);
});

//获取稿件的发稿量和采用量
app.get('/apis/gateway/publishmanu', function (req, res) {
  var publishmanu = JSON.parse(fs.readFileSync(publishManuScriptDataFile, 'utf-8'));
  res.send(publishmanu);
});

//获取待办事项和值班表信息
app.get('/apis/gateway/waitduty', function (req, res) {
  var waitduty = JSON.parse(fs.readFileSync(waitDutyDataFile, 'utf-8'));
  res.send(waitduty);
});

//获取报道墙信息
app.get('/apis/gateway/reportwall', function (req, res) {
  var reportwalls = JSON.parse(fs.readFileSync(reportWallDataFile, 'utf-8'));
  res.send(reportwalls);
});

//获取分享墙信息
app.get('/apis/gateway/sharewall', function (req, res) {
  var sharewalls = JSON.parse(fs.readFileSync(shareWallDataFile, 'utf-8'));
  res.send(sharewalls);
});

//获取舆情与线索的信息
app.get('/apis/gateway/opinionclue', function (req, res) {
  var opinionclues = JSON.parse(fs.readFileSync(opinionClueDataFile, 'utf-8'));
  res.send(opinionclues);
});


//获取新闻图片信息
app.get('/apis/gateway/newsframe', function (req, res) {
  var newsframes = JSON.parse(fs.readFileSync(newsFrameDataFile, 'utf-8'));
  res.send(newsframes);
});
