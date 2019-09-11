/**
 * Created by free on 16/11/5.
 */
var fs = require("fs");
var app = require('../app');

/*var treemenuDataFile = __dirname + "/" + "treemenu.data.json";*/
var createStoryInfoDataFile = __dirname + "/" + "create-story-info.data.json";
/*var topmenusDataFile = __dirname + "/" + "topmenus.data.json";*/
var operationDataFile = __dirname + "/" + "operation.data.json";
var filterTypesDataFile = __dirname + "/" + "filterTypes.data.json";
var currentUserDataFile = __dirname.replace("\work","") + "/user/" + "currentuser.data.json";
var storysDataFile = __dirname.replace("\work","") + "/story/" + "story.data.json";
var defaultStoryDataFile = __dirname.replace("\work","") + "/story/" +  "story-default.data.json";
var channelmenusDataFile = __dirname + "/" + "channelmenus.data.json";
var channelmenustreeDataFile = __dirname + "/" + "channelmenus-tree.data.json";
var personDataFile = __dirname + "/" + "personalInformation.data.json";

if (!fs.existsSync(storysDataFile) || fs.readFileSync(storysDataFile, 'utf-8').length == 0) {

  fs.writeFileSync(storysDataFile, JSON.stringify(JSON.parse(fs.readFileSync(defaultStoryDataFile, 'utf-8'))));

}

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

app.get('/apis/v1/persons/get/:id', function (req, res) {
  var leftmenus = JSON.parse(fs.readFileSync(personDataFile, 'utf-8'));
  console.log(leftmenus);
  res.send(leftmenus);
});

// 返回左侧弹出树
/*app.get('/apis/work/treemenus', function (req, res) {
  var treemenus = JSON.parse(fs.readFileSync(treemenuDataFile, 'utf-8'));
	console.log(treemenus);
  res.send(treemenus);
});
*/
// 取得新建稿件的配置信息
app.get('/apis/work/create-story-info', function (req, res) {
  var info = JSON.parse(fs.readFileSync(createStoryInfoDataFile, 'utf-8'));
  res.send({"status":{"code":0},"data":info});
});

// 返回工作区顶部操作
app.get('/apis/work/newsOperation', function (req, res){
  var operations = JSON.parse(fs.readFileSync(operationDataFile, 'utf-8'));
  res.send(operations);
})

// 返回filter条件
app.get('/apis/work/filtermenus', function (req, res){
  var filtermenus = JSON.parse(fs.readFileSync(filterTypesDataFile, 'utf-8'));
  res.send(filtermenus);
})

app.post('/apis/work/updateFavorite', function (req, res) {
    console.log("docid=",req.body.docid,"is_favorite=",req.body.is_favorite);
    var result = {data:"success"};
    res.send(result);
});

app.post('/apis/work/selectAnduse', function (req, res) {
    console.log("selectAnduse docid=",req.body.docid);
    var result = {data:"success"};
    res.send(result);
});

/////////////////////////////////后台接口对接对应--开始/////////////////////////////////////
app.get("/channelmenus/get", function (req, res) {
	var channelmenus = JSON.parse(fs.readFileSync(channelmenusDataFile, 'utf-8'));
	var retVal = JSON.stringify(channelmenus);
	res.send(retVal);
});

app.get("/channelmenus/getprogramname/:channelId/:programId", function (req, res) {
	var channelmenustree = JSON.parse(fs.readFileSync(channelmenustreeDataFile, 'utf-8'));
	var data = req.params;
	console.log(data.channelId,"渠道ID");
	console.log(data.programId,"栏目ID");
	var channelData = channelmenustree.filter(channelmenutree => channelmenutree.result[0].id == data.channelId);
	console.log(JSON.stringify(channelData),"一次过滤");
	var programDatas = channelData[0].result[0].catalogItems;
	var rtnProgramData = programDatas.filter(programData => programData.id == data.programId);
	console.log(JSON.stringify(rtnProgramData));
	res.send(rtnProgramData[0]);
});

app.get("/channelmenus/gettree", function (req, res) {
	var channelmenustree = JSON.parse(fs.readFileSync(channelmenustreeDataFile, 'utf-8'));
	
	var retVal = JSON.stringify(channelmenustree);
	console.log(retVal);
	res.send(retVal);
});
/////////////////////////////////后台接口对接对应--开始/////////////////////////////////////

app.post('/api/work/sendToProofread', function (req, res) {
    console.log("sendToProofread  docid=",req.body.docid);
    //获取稿件文件
    var storys = JSON.parse(fs.readFileSync(storysDataFile, 'utf-8'));
    var temstory = storys.find(story => story.DocID == req.body.docid);
    temstory.ProcessStatus = "待校对";
    temstory.ChannelType = 0;
    temstory.ReadAccessList.push("A1B0C4");

    fs.writeFileSync(storysDataFile, JSON.stringify(storys));
    var result = {data:"success"};
    res.send(result);
});

app.post('/api/work/sendToReview', function (req, res) {
    console.log("sendToReview  docid=",req.body.docid);
    //获取稿件文件
    var storys = JSON.parse(fs.readFileSync(storysDataFile, 'utf-8'));
    var temstory = storys.find(story => story.DocID == req.body.docid);
    temstory.ProcessStatus = "待审";
    temstory.ChannelType = 0;
    temstory.ReadAccessList.push("A1B0C0");

    fs.writeFileSync(storysDataFile, JSON.stringify(storys));
    var result = {data:"success"};
    res.send(result);
});

app.post('/apis/work/getSendProofreadList', function (req, res) {
    var result = {'roleList':[{'description':"北京分社的分社发稿人","orgId":"3002",'orgName':"北京分社",'roleId':"3002002",'roleName':"北京分社分社发稿人",'roleType':"2",'sequence':"/1001/2002/3002",'sequenceName':"/新华通讯社/国内分社/北京分社"}]};
    res.send(result);
});
