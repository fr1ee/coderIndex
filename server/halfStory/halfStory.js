/**
 * Created by free on 16/11/5.
 */
var fs = require("fs"); 
var app = require('../app');


var halfStoryDataFile = __dirname + "/" + "halfStory.data.json";
var treeDataFile = __dirname + "/" + "tree.data.json";
var treeAnoDataFile = __dirname + "/" + "tree.ano.data.json";

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

app.post('/apis/halfStory/getHalfStoryList', function (req, res) {
	console.log("pram=",req.body.pram);
	var condition=req.body.pram;
  	var sortOrderBy=condition.sortOrderBy;
  	var sortName=condition.sortName;
 	var wordSoat=condition.searchWord;
	var files = JSON.parse(fs.readFileSync(halfStoryDataFile, 'utf-8'));
	if(req.body.pram.docid == 'B001'){
		if (sortOrderBy) {
  			let order = sortOrderBy%2 == 0?'asc':'desc';
   			files = files.sort((a,b) => {
   		   		if (order === 'asc') {
    	    		return a[sortName] > b[sortName];
   		   		} else {
   	    			return a[sortName] < b[sortName];
   		   		}
     		});
    	}
	}else{
  			let order = sortOrderBy%2 == 0?'asc':'desc';
   			files = files.sort((a,b) => {
   		   		if (order === 'desc') {
    	    		return a[sortName] > b[sortName];
   		   		} else {
   	    			return a[sortName] < b[sortName];
   		   		}
     		});
    	
	}
	if(wordSoat){
  		files = files.filter(favoi => {
      		return favoi.title.indexOf(wordSoat.trim()) >= 0;
   		});
   		console.log("==============",files);
      	files.data=files;
    }
    res.send(files);
	
});

app.post('/apis/halfStory/saveHalfStoryObj', function (req, res) {
  	var newMater=req.body.obj;
	var Maters=JSON.parse(fs.readFileSync(halfStoryDataFile, 'utf-8'));
	var date = new Date().Format("yyyy/MM/dd");
	var favorId=newMater.id;	
	if(favorId==undefined){
	    var idString = date + (Math.floor(1000*(1+Math.random())));
        newMater.id=idString;
    	newMater.types=2;
    	Maters.time=date;
    	Maters.push(newMater);
    	fs.writeFileSync(halfStoryDataFile,JSON.stringify(Maters));
    	res.send( {"errCode":"0","errMsg":"","document":Maters});	
	}else{	
		var i=0;		
		for(i=0;i<Maters.length;i++){
			if(Maters[i].id==newMater.id){
				Maters.splice(i,1,newMater);
			}
		}
        console.log(Maters);
    	fs.writeFileSync(halfStoryDataFile,JSON.stringify(Maters));
    	res.send( {"errCode":"0","errMsg":"","document":newMater});
	}
});

app.post('/apis/halfStory/deleteHalfStorys', function (req, res) {
	var idString=req.body.ids;
	var halfStorys=JSON.parse(fs.readFileSync(halfStoryDataFile, 'utf-8'));
	var lengths=halfStorys.length;
	console.log("========原来条数======",lengths);
	var i=0;
	var j=0;
	for(i=0;i<idString.length;i++){
		for(j=0;j<halfStorys.length;j++){
			if(idString[i]==halfStorys[j].id){
				halfStorys.splice(j,1);
			}
		}
	}
	console.log("======后来条数========",halfStorys.length);
    fs.writeFileSync(halfStoryDataFile,JSON.stringify(halfStorys));
    var result = {data:"success"};
    res.send(result);
});

app.post('/apis/halfStory/copyToHalfStory', function (req, res) {
//  console.log("ids=",req.body.ids);
    var result = {data:"success"};
    res.send(result);
});

app.post('/apis/halfStory/saveDragDrop', function (req, res) {
//  console.log("ids=",req.body.docid,"targetid=",req.body.targetid);
    var result = {data:"success"};
    res.send(result);
});

app.get('/apis/halfStory/getHalfStoryTree', function (req, res) {
	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
	console.log("==================",treeDate);
    res.send(treeDate);
});


app.get('/apis/halfStory/getAnoHalfStoryTree', function (req, res) {
	var treeDate = JSON.parse(fs.readFileSync(treeAnoDataFile, 'utf-8'));
	console.log("==================",treeDate);
    res.send(treeDate);
});
