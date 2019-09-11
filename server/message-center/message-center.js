/**
 * Created by free on 16/11/5.
 */
var fs = require("fs");
var app = require('../app');
var http = require('http');

var msgDataFile = __dirname + "/" + "message.data.json";
var msgdraftDataFile = __dirname + "/" + "messagedraft.data.json";

app.post('/apis/messagecenter/list', function (req, res) {
	var msgArray = JSON.parse(fs.readFileSync(msgDataFile, 'utf-8'));
//	var msgDraftArray = JSON.parse(fs.readFileSync(msgdraftDataFile, 'utf-8'));
//	if(msgDraftArray != null && msgDraftArray.length != 0){
//		var intCount = 0;
//		if(msgArray != null && msgArray.length != 0){
//			intCount = msgArray.length;
//		}
//		for(var i = 0; i < msgDraftArray.length; i++){
//			msgArray[intCount] = msgDraftArray[i];
//			intCount++;
//		}
//	}
	var nodeals = msgArray.filter(nodeal => nodeal.messageType == "1");
	var notices = msgArray.filter(notices => notices.messageType == "2");
	var dynamics = msgArray.filter(dynamic => dynamic.messageType == "3");
	var sysMs = msgArray.filter(sysM => sysM.messageType == "4");
	
	var rtn = {"errCode":"0","content":{"nodeal":nodeals,"notice":notices,"dynamic":dynamics,"system":sysMs}}
	res.send(rtn);
});

app.post('/api/message/create', function (req, res) {
	var msgArray = JSON.parse(fs.readFileSync(msgDataFile, 'utf-8'));
	var newMsg = req.body;
	var msgCount = 0;
	if(msgArray != null && msgArray.length != 0){
		msgCount = msgArray.length;
		msgArray[msgCount] = newMsg;
		msgArray[msgCount].messageType = "1";
		msgArray[msgCount].messageDateTime = "2016/02/23 14:23";
	}
	fs.writeFileSync(msgDataFile, JSON.stringify(msgArray));
	res.send(JSON.stringify("1"));
});

app.post('/api/message/save', function (req, res) {
	var msgArray = JSON.parse(fs.readFileSync(msgdraftDataFile, 'utf-8'));
	var newMsg = req.body;
	var msgCount = 0;
	if(msgArray != null && msgArray.length != 0){
		msgCount = msgArray.length;
		msgArray[msgCount] = newMsg;
		msgArray[msgCount].messageType = "6";
		msgArray[msgCount].messageDateTime = "2016/02/23 14:23";
	}
	fs.writeFileSync(msgdraftDataFile, JSON.stringify(msgArray));
	res.send(JSON.stringify("1"));
});