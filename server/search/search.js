/**
 * Created by free on 16/11/5.
 */
 var fs = require("fs");
 var app = require('../app');

 var searchConditionDataFile = __dirname + "/" + "advacedsearch.data.json";

 var searchStoryDataFile = __dirname + "/" + "searchstorylist.data.json";

// 当前登陆用户文件，模拟token，模拟时只能单用户登陆
var currentUserFile = __dirname +"/../user/" + "currentuser.data.json";

var searchOperationDataFile = __dirname + "/" + "search-operation.data.json";

var saveSearchConditionDataFile = __dirname + "/" + "search-conditions.data.json";


app.get('/apis/search/searchcondition', function (req, res) {
  var searchconditions = JSON.parse(fs.readFileSync(searchConditionDataFile, 'utf-8'));
  res.send(searchconditions);
});

app.get('/apis/search/mineSearchCondition', function (req, res) {
  var mineSearchCondition = JSON.parse(fs.readFileSync(saveSearchConditionDataFile, 'utf-8'));
  res.send(mineSearchCondition);
});


app.get('/apis/search/getOperation', function (req, res) {
  var getOperation = JSON.parse(fs.readFileSync(searchOperationDataFile, 'utf-8'));
  res.send(getOperation);
});

app.post('/apis/search/appointedCondition', function (req, res) {
  console.log(req.body.label);
  var conditionArr = new Array();
  var appointedCondition = JSON.parse(fs.readFileSync(saveSearchConditionDataFile, 'utf-8'));
  for(var i = 0 ; i < appointedCondition.length ; i ++ ){
    if(appointedCondition[i].conditionLabel == req.body.label){
      conditionArr.push(appointedCondition[i].conditionValue);
      res.send(conditionArr);
      return;
    }
  }
  
});

app.post('/apis/search/searchstory', function (req, res) {
  // 所有稿件
  var storys = JSON.parse(fs.readFileSync(searchStoryDataFile, 'utf-8'));
  res.send(storys);
});

app.post('/apis/search/saveCondition', function (req, res) {

  var searchCondition = JSON.parse(fs.readFileSync(saveSearchConditionDataFile, 'utf-8'));
  let searchConditionLabel = [];
  for(var i=0; i < searchCondition.length; i++) {
    searchConditionLabel.push(searchCondition[i].conditionLabel);
  }
  let index = searchConditionLabel.findIndex(g => g == req.body.conditionLabel);
  if(index < 0){
    searchCondition.push(req.body);
    fs.writeFile(saveSearchConditionDataFile, JSON.stringify(searchCondition),function (err) {
      if (err) throw err ;
      console.log("File Saved !"); //文件被保存
    });
    res.send({errCode : 0, errMsg:'', content : req.body.document});
    return;
  }
});
