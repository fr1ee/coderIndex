/**
 * Created by free on 16/11/5.
 */
var fs = require("fs");
var app = require('../app');
var http = require('http');
var querystring=require('querystring');

var storyDataFile = __dirname + "/" + "story.data.json";
var defaultStoryDataFile = __dirname + "/" + "story-default.data.json";
//var storyEditorDataFile = __dirname + "/" + "story.editor.data.json";
var storyResDataFile = __dirname + "/" + "story.res.data.json";
var storyPropDataFile = __dirname + "/" + "story.prop.data.json";
var sendStoryResDataFile = __dirname + "/" + "story.send.data.json";
//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

var storyImageDataFile = __dirname + "/" + "story.image.data.json";

// 当前登陆用户文件，模拟token，模拟时只能单用户登陆
var currentUserFile = __dirname +"/../user/" + "currentuser.data.json";

var SelectTopticDataFile = __dirname + "/" + "story.selecttoptic.data.json";

var SelectSignStoryDataFile = __dirname + "/" + "story.sign.data.json";

var SendPersonStoryDataFile = __dirname + "/" + "story.send.person.data.json";

// init story data begin
// DO NOT COMMIT local story.data.json
if (!fs.existsSync(storyDataFile) || fs.readFileSync(storyDataFile, 'utf-8').length == 0) {
  fs.writeFileSync(storyDataFile, JSON.stringify(JSON.parse(fs.readFileSync(defaultStoryDataFile, 'utf-8'))));
}
// init story data end

app.get('/docs/:id', function (req, res) {
  var storyArray = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  for(var i=0; i < storyArray.length; i++) {
      if (storyArray[i].docID == req.params.id) {
          res.send({errCode : 0, errMsg:'', content : storyArray[i] });
          return;
      }
  }
  res.send({errCode : 0, errMsg:'', content : storyArray[i] });
});

app.post('/api/story/selectstoryid', function (req, res) {
  var storyarr = new Array();
  var storyArray = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  for(var i=0; i < storyArray.length; i++) {
    if (storyArray[i].DocID == req.body.id) {
        storyarr.push(storyArray[i]);
        break;
    }
  }
  res.send({"arr":storyarr});
});

app.put('/docs/:id', function (req, res) {
  //var story = JSON.parse(fs.readFileSync(storyEditorDataFile, 'utf-8'));
  var storyArray = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  console.log(req.body);
  for(var i=0; i < storyArray.length; i++) {
      if (storyArray[i].docID == req.params.id) {
          storyArray[i] = req.body.document;
          fs.writeFile(storyDataFile, JSON.stringify(storyArray),function (err) {
              if (err) throw err ;
              console.log("File Saved !"); //文件被保存
          });
          res.send({errCode : 0, errMsg:'', content : req.body.document});
          return;
      }
  }
  storyArray.push(req.body.document);
  fs.writeFile(storyDataFile, JSON.stringify(storyArray),function (err) {
      if (err) throw err ;
      console.log("File Saved !"); //文件被保存
  });
  res.send({errCode : 0, errMsg:'', content : req.body.document});
});

app.get('/apis/getTopics', function (req, res) {
  var getTopics = JSON.parse(fs.readFileSync(sendStoryResDataFile, 'utf-8'));
  res.send(getTopics);
});

app.get('/apis/sendStory/selectPersonList/:orgId', function (req, res) {
  console.log(req.params.orgId);
  var orgId = req.params.orgId;
  var selectPersonList = JSON.parse(fs.readFileSync(SendPersonStoryDataFile, 'utf-8'));
  var personList = {data:[]};
  if(selectPersonList[orgId]){
    personList.data = selectPersonList[orgId];
  }
  res.send(personList);
});


app.post('/api/sendStory/type', function (req, res) {
  console.log(req.body);
  var storyarr = new Array();
  var storyArray = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  for(var i=0; i < storyArray.length; i++) {
    if (storyArray[i].DocID == req.body.docID) {
      storyarr.push(storyArray[i]);
    }
  }
  for(var k =0 ;k<storyarr.length;k++){
    storyArray.push(storyarr[k]);
    storyarr[k].ReadAccessList.push(req.body.targetUser);
  }
  fs.writeFileSync(storyDataFile, JSON.stringify(storyArray));
  var result = {data:"OK"};
  res.send(result);
});

app.post('/api/sendStory/targetType', function (req, res) {
  console.log(req.body);
  var storyarr = new Array();
  var storyArray = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  for(var i=0; i < storyArray.length; i++) {
    if (storyArray[i].DocID == req.body.docID) {
      storyarr.push(storyArray[i]);
    }
  }
  for(var k =0 ;k<storyarr.length;k++){
    storyArray.push(storyarr[k]);
    storyarr[k].ReadAccessList.push(req.body.targetDept);
  }
  fs.writeFileSync(storyDataFile, JSON.stringify(storyArray));
  var result = {data:"OK"};
  res.send(result);
});

app.post('/api/selectToptic', function (req, res) {
  var selectToptic = JSON.parse(fs.readFileSync(SelectTopticDataFile, 'utf-8'));
  res.send(selectToptic);
});

app.get('/apis/getOrgList', function (req, res) {
  var storyRes = JSON.parse(fs.readFileSync(sendStoryResDataFile, 'utf-8'));
  res.send(storyRes);
});

app.get('/apis/getRoleList', function (req, res) {
  var storyRes = JSON.parse(fs.readFileSync(sendStoryResDataFile, 'utf-8'));
  res.send(storyRes);
});

app.get('/apis/selectSignStory', function (req, res) {
  var selectSignStory = JSON.parse(fs.readFileSync(SelectSignStoryDataFile, 'utf-8'));
  res.send(selectSignStory);
});
app.get('/api/storyRes', function (req, res) {
  var storyRes = JSON.parse(fs.readFileSync(storyResDataFile, 'utf-8'));
  res.send(storyRes);
});
app.get('/api/storyProperty', function (req, res) {
  var storyProp = JSON.parse(fs.readFileSync(storyPropDataFile, 'utf-8'));
  res.send(storyProp);
});
app.get('/apis/sendStoryRes', function (req, res) {
  var sendStoryRes = JSON.parse(fs.readFileSync(sendStoryResDataFile, 'utf-8'));
  res.send(sendStoryRes);
});
app.post('/apis/fileupload/:id', function (req, res) {
  for(var i in req.files){
    console.log('uploaded:' , req.files[i]);
  }
  res.send('ok');
});
app.post('/apis/downloadgif', function (req, res) {
  var gifdata = req.body.gifdata;
  gifdata = gifdata.replace("data:image/gif;base64,", "");
  var b = new Buffer(gifdata, "base64");
  // console.log("b.byteLength : " + b.byteLength);
  res.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + encodeURI('下载.gif'),
    'Content-Length': b.byteLength
  });
  res.write(b);
});
app.post('/api/v1/checkSentence/checkContent/check', function (req, res) {
  res.write('"1a8b360c62f647e0a6207d73a793e2c7"');
  res.end();
});
app.get('/api/v1/checkSentence/checkContent/getCheckResult', function (req, res) {
  // 测试文本如下
  /*
措误
措误
措误
措误
白头山天池调水
在文化大革命后
  */
  var storyRes = JSON.parse(fs.readFileSync(__dirname + "/" + "story.spell.check.data.json", 'utf-8'));
  res.send(storyRes);
});
app.post('/api/chkSpell', function(req, res) {
	// 整理请求数据
	var userId = req.body.userId;
	var depId = req.body.depId;
	var language = req.body.language;
	var title = req.body.title;
	var keyword = req.body.keyword;
	var summary = req.body.summary;
	var content = req.body.content;
	var chkData = {
			userId : userId,
			depId:depId,
			language : language
	};
	if(title){
		chkData.title = title;
	}
	if(keyword){
		chkData.keyword = keyword;
	}
	if(summary){
		chkData.summary = summary;
	}
	if(content){
		chkData.content = content;
	}
	var postData = querystring.stringify(chkData);
	// console.log("【【【【【请求数据】】】】】" + JSON.stringify(chkData));
	// 请求信息
	var options = {
		hostname : '192.168.1.92',
		port : 8000,
		path : '/checkServer/checkService',
		method : 'POST',
		header : {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
			'Content-Length' : Buffer.byteLength(postData)
		}
	}
	// 请求并返回
	var httpReq = http.request(options, function(httpRes) {
		httpRes.setEncoding('utf-8');
		var resdata = null;
		httpRes.on('data', function(data) {
			resdata = data;
		});
		httpRes.on('end', function() {
			try{
				// console.log("【【【【【返回数据】】】】】" + resdata);
			    var chkSpellRes = JSON.parse(resdata);
			    res.send(chkSpellRes);
			} catch(error) {
				res.send({
					"success" : "-902",
					"errorMsg" : "请求拼写检查服务返回结果异常"
				});
			}
		});
	});
	httpReq.on('error', function(err) {
		res.send({
			"success" : "-903",
			"errorMsg" : "请求拼写检查服务时异常"
		});
	});
	httpReq.write(postData);
	httpReq.end();
});

app.get('/api/storyImage', function (req, res) {
  var storyImageData = JSON.parse(fs.readFileSync(storyImageDataFile, 'utf-8'));
  console.log(req.params);
  res.send(storyImageData);
});

////////////////////////////////////////////////////////
// 工作区画面： 稿件检索
app.post('/api/work/search-story', function (req, res) {
  // 所有稿件
  var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  // 当前用户
  var user = JSON.parse(fs.readFileSync(currentUserFile, 'utf-8'));

  // TODO 从req中取得检索条件
  // TODO 按条件过滤
  // 1: { category: 'mine',
  //  subCategory: 'story',
  // 2: status: '1',
  // 4: type: [],
  // pattern: [],
  // 3: author: '',
  // reportPlace: '',
  // reportDay: '',
  // 5: searchWord: '',
  // listNumberFrom: 0,
  // listNumberTo: 15,
  // 6: sortBy: '',
  // x: sortType: 0 }   order
  var condition = req.body;
  console.log(">> 检索条件：" , condition);
  console.log(">> 用户信息：" , user);
  console.log(" >> " + storys.length + " storys" );
  // 个人与本组稿件筛选 TODO 演示方案
  if (condition.category != '') {
    if (condition.category == 'mine') {
      // 得到某个人的稿件
      storys = storys.filter(story => story.ReadAccessList.indexOf(user.userId) >= 0);
    } else if (condition.category == 'group') {
      // 得到本组的稿件 TODO 未定
      storys= storys.filter(story => story.ReadAccessList.indexOf(user.orgId) >= 0);
    } else if (condition.category == 'department') {
      // 得到本部门的稿件 TODO 未定
      storys= storys.filter(story => story.ReadAccessList.indexOf(user.orgId) >= 0);
    } else if (condition.category == 'report') {
      // 得到报道组的稿件 TODO 未定
      // storys= storys.filter(story => story.ReadAccessList.indexOf(user.orgId) >= 0);
    } else {
      res.send({"status":{"code":1,"message":"分类错误：" + condition.category}});
      return;
    }
  }
  if (condition.sendTosId != '') {
  	//得到该渠道栏目下的稿件
  	storys= storys.filter(story => story.SendTosId==condition.sendTosId
  	                               && story.ChannelType == condition.channelTypeId);
  }
  console.log(" >> " + storys.length + " storys, filter by category: " + condition.category );

  // status筛选
  if (condition.status) {
    // 1：全部，2：个人稿（自建、退回、协同、定向传入的稿子），3：已处理
    if (condition.status == 2){
      storys = storys.filter(story => story.ProcessStatus == "个人稿");
    }else if (condition.status == 10){
      storys = storys.filter(story => story.ProcessStatus == "待审");
    }else if (condition.status == 7){
      storys = storys.filter(story => story.ProcessStatus == "待校对");
    }
  }
  console.log(" >> " + storys.length + " storys, filter by status: " + condition.status );

  // author
  if (condition.author != ''){
    storys = storys.filter(story => story.Authors.findIndex(author => {author == condition.author}) >= 0);
  }
  console.log(" >> " + storys.length + " storys, filter by author: " + condition.author );

  // type
  if (condition.type.length > 0) {
    storys = storys.filter(story => condition.type.indexOf(story.type) >= 0 );
  }
  console.log(" >> " + storys.length + " storys, filter by type: " + condition.type );

  // searhWord: title
  if (condition.searchWord) {
    storys = storys.filter(story => {
      return story.HeadLine.indexOf(condition.searchWord) >= 0;
    });
  }
  console.log(" >> " + storys.length + " storys, filter by searchWord: " + condition.searchWord );

  // sort
  if (condition.sortBy) {
    var order = condition.sortType || 'asc';
    storys = storys.sort((a,b) => {
      if (order === 'asc') {
        return a[condition.sortBy] > b[condition.sortBy];
      } else {
        return a[condition.sortBy] < b[condition.sortBy];
      }
    });
  }
  console.log(" >> " + storys.length + " storys, sorted by : " + condition.sortBy + "/" + condition.sortType );

  var data = {"status":{"code":0},"data":storys};
 // console.log("/api/work/search-story: " + JSON.stringify(data));
  res.send(data);
});

// //获取所有稿件
// app.get('/api/storys/all', function (req, res) {
//   console.log("server>>allstory>>/api/storys/all>>storyDataFile",storyDataFile);
//   var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
//   res.send(storys);
// });

// 工作区画面：选题检索
// TODO POST
app.get('/api/work/search-topic', function (req, res) {
  var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  var data = {"status":{"code":0},"data":storys};
  console.log("/api/work/search-topic: " + JSON.stringify(data));
  res.send(data);
});

// app.get('/api/story/list/:group/:category',function(req,res){
//   console.log("server>>/api/story/list/:group/:category");
//   var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
//   var user=JSON.parse(fs.readFileSync(currentUserFile, 'utf-8'));
//   var group=req.params.group;
//   if(group=='mine') {
//     //let result = storys.filter(story => story.ReadAccessList.indexOf(user.userId) >= 0))
//     //res.send(result);
//     //
//   //.indexOf("orange") != -1
//     console.log("server>>/api/story/list/:group>>mine>>user.userId",user.userId,"req.params.group",req.params.group,req.params.category);
//     var newArr = storys.filter(function(item){
//       return  item.ReadAccessList.indexOf(user.userId) >=0;
//     });
//     res.send(newArr);
//   }
//   else{
//     //let result = storys.filter(story => story.ReadAccessList.indexOf(user.user.userOrgRoles[0].orgId) >= 0))
//     //let newArr = storys.filter(function(item){
//      //return storys;
//       // return  item.ReadAccessList.indexOf(user.user.userOrgRoles[0].orgId) >=0;
//     //});
//     res.send(storys);
//   }
// });

// 时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 工作区画面：建空稿
app.post('/docs/new', function(req, res) {
  var newStory = req.body;
  if(newStory.docID != "") {
    var error = {"status":{"code":1,"message":"数据错误，新建稿不应该有稿件ID"}};
    res.send(error);
    console.log("/api/work/create-story: " + JSON.stringify(error));
    return;
  }

  // 设置稿件ID
  var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  var date = new Date().Format("yyyyMMdd");
  while(true) {
    var docID = date + (Math.floor(1000*(1+Math.random())));
    var index = storys.findIndex(story => story.docID == docID);
    if (index < 0) {
      break;
    }
  }
  newStory.docID = docID;
  // 设置稿件作者
  var user = JSON.parse(fs.readFileSync(currentUserFile, 'utf-8'));
  newStory.Authors = user.userName;
  newStory.authors = user.userName;
  // 设置稿件所属
  // TODO 演示暂定
  newStory.ReadAccessList = [user.userId];
  newStory.WriteAccessList = [user.userId];
  // 设置稿件时间
  newStory.CreateDateTime = new Date();
  // 设置稿件状态
  newStory.ProcessStatus = "个人稿";

  // 保存
  storys.push(newStory);
  console.log('/docs >> ' + JSON.stringify(newStory));
  fs.writeFileSync(storyDataFile, JSON.stringify(storys));

  res.send(newStory);
})

// 工作区画面：拷贝建稿
app.post('/docs/copy', function(req, res) {
  var params = req.body.params;
  console.log(params);
 
  // 设置稿件ID
  var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  var tem_storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
  var date = new Date().Format("yyyyMMdd");
  var docID = "";
  while(true) {
    docID = date + (Math.floor(1000*(1+Math.random())));
    var index = storys.findIndex(story => story.DocID == docID);
    if (index < 0) {
      break;
    }
  }
  
  var newStory = tem_storys.find(story => story.DocID == params.DocID[0]);
  if(!newStory){
  	newStory = tem_storys[0];
  }
  newStory.DocID = docID;
  // 设置稿件作者
  var user = JSON.parse(fs.readFileSync(currentUserFile, 'utf-8'));
  newStory.Authors = user.userName;
  // 设置稿件所属
  // TODO 演示暂定
  newStory.ReadAccessList = [user.userId];
  newStory.WriteAccessList = [user.userId];
  // 设置稿件时间
  newStory.CreateDateTime = new Date();
  // 设置稿件状态
  newStory.ProcessStatus = "个人稿";

  // 保存
  storys.push(newStory);
  console.log('/docs >> ' + JSON.stringify(newStory));
  fs.writeFileSync(storyDataFile, JSON.stringify(storys));

  res.send( {"errCode":"0","errMsg":"","DocID":docID,"Type":params.MediaType});
})

//wang-yiming
// app.post('/api/story/search', function (req, res) {
//   var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
//   var postbody= req.body;
//   console.log(">>>>>>>>>>>>>>>>>>>>>>\n",postbody);
//   // 个人与本组稿件筛选
//   if(group=='mine') {
//     // 得到某个人的稿件
//     let result = storys.filter(story => story.ReadAccessList.indexOf(user.userId) >= 0);
//     res.send(result);
//     //console.log("server>>/api/story/list/:group>>mine>>user.userId",user.userId,"req.params.group",req.params.group,req.params.category);
//     //var newArr = storys.filter(function(item){
//     //  return  item.ReadAccessList.indexOf(user.userId) >=0;
//     //});
//     //res.send(newArr);
//   }
//   else{
//     // 得到部门的稿件
//     let result = storys.filter(story => story.ReadAccessList.indexOf(user.roleId) >= 0);
//     //let newArr = storys.filter(function(item){
//      //return storys;
//       // return  item.ReadAccessList.indexOf(user.user.userOrgRoles[0].orgId) >=0;
//     //});
//     res.send(result);
//   }
//   console.log(postbody);
//   res.send(storys);
// });

// //获取所有稿件
// app.get('/api/storys/all', function (req, res) {
//   console.log("server>>allstory>>/api/storys/all>>storyDataFile",storyDataFile);
//   var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
//   res.send(storys);
// });

// app.get('/api/topic/story', function (req, res) {
//   console.log("server>>allstory>>/api/topic/story");
//   var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
//   res.send(storys);
// });

// app.get('/api/story/list/:group/:category',function(req,res){
//   console.log("server>>/api/story/list/:group/:category");
//   var storys = JSON.parse(fs.readFileSync(storyDataFile, 'utf-8'));
//   var user=JSON.parse(fs.readFileSync(currentUserFile, 'utf-8'));
//   var group=req.params.group;
//   if(group=='mine') {
//     // 得到某个人的稿件
//     let result = storys.filter(story => story.ReadAccessList.indexOf(user.userId) >= 0);
//     res.send(result);
//     console.log("server>>/api/story/list/:group>>mine>>user.userId",user.userId,"req.params.group",req.params.group,req.params.category);
//     //var newArr = storys.filter(function(item){
//     //  return  item.ReadAccessList.indexOf(user.userId) >=0;
//     //});
//     //res.send(newArr);
//   }
//   else{
//     // 得到部门的稿件
//     let result = storys.filter(story => story.ReadAccessList.indexOf(user.roleId) >= 0);
//     //let newArr = storys.filter(function(item){
//      //return storys;
//       // return  item.ReadAccessList.indexOf(user.user.userOrgRoles[0].orgId) >=0;
//     //});
//     res.send(result);
//   }
// });
