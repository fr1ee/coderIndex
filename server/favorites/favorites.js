/**
 * Created by free on 16/11/5.
 */
var fs = require("fs"); 
var app = require('../app');
var http = require('http');
var querystring=require('querystring');


var favoriteDataFile = __dirname + "/" + "favorite.data.json";
var favoriteDataFile1 = __dirname + "/" + "favorite.data1.json";
var favoriteDataFile11 = __dirname + "/" + "favorite1.data.json";
var favoriteDataFile3 = __dirname + "/" + "favorite3.data.json";
var favoriteDataFile4 = __dirname + "/" + "favorite4.data.json";
var favoriteDataFile5 = __dirname + "/" + "favorite5.data.json";
var favoriteDataFile6 = __dirname + "/" + "favorite6.data.json";
var favoriteDataFile7 = __dirname + "/" + "favorite7.data.json";
var favoriteDataFile8 = __dirname + "/" + "favorite8.data.json";

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。


app.post('/apis/favorite/searchFavorite', function (req, res) {
  //console.log("obj=",req.body.obj);
  var favorit = JSON.parse(fs.readFileSync(favoriteDataFile, 'utf-8'));
  var favorit1 = JSON.parse(fs.readFileSync(favoriteDataFile1, 'utf-8'));
  var favorit11 = JSON.parse(fs.readFileSync(favoriteDataFile11, 'utf-8'));
  var favorit12 = JSON.parse(fs.readFileSync(favoriteDataFile3, 'utf-8'));
  var favorit13= JSON.parse(fs.readFileSync(favoriteDataFile4, 'utf-8'));
  var favorit14 = JSON.parse(fs.readFileSync(favoriteDataFile5, 'utf-8'));
  var favorit15 = JSON.parse(fs.readFileSync(favoriteDataFile6, 'utf-8'));
  var favorit16 = JSON.parse(fs.readFileSync(favoriteDataFile7, 'utf-8'));
  var favorit17 = JSON.parse(fs.readFileSync(favoriteDataFile8, 'utf-8'));
  /*if(favorit.length > 4 && req.body.favoriteId != ""){
  	favorit.splice(0,1);
  	favorit.splice(2,1);
  }*/
  var condition=req.body.obj;//
  var sortOrderBy=condition.sortOrderBy;
  var sortName=condition.sortName;
  var leftid=condition.leftid;
  var wordSoat=condition.searchWord;
  
  if (sortOrderBy) {
    let order = sortOrderBy%2 == 0?'asc':'desc';
    favorit = favorit.sort((a,b) => {
      	if (order === 'asc') {
        	return a[sortName] > b[sortName];
      	} else {
       		return a[sortName] < b[sortName];
      	}
    });
  }
  
  if(wordSoat){
  	favorit = favorit.filter(favoi => {
      return favoi.favoriteName.indexOf(wordSoat.trim()) >= 0;
    });
  }
  console.log(leftid);
  if(leftid=="all"){
//	favorit=favorit1;
  }
  if(leftid=="halfStory"){
  	favorit=favorit11;
  }
   if(leftid=="finishStory"){
  	favorit=favorit12;
  }
  if(leftid=="foreign"){
  	favorit=favorit13;
  }
  if(leftid=="audio"){
  	favorit=favorit14;
  }
  if(leftid=="internet"){
  	favorit=favorit15;
  }
  if(leftid=="material"){
  	favorit=favorit16;
  }
  if(leftid=="repository"){
  	favorit=favorit17;
  }
  
  res.send(favorit);
});

app.post('/apis/favorite/saveFavoriteObj', function (req, res) {
	var newFavoriteDialog=req.body.obj;
	//console.log(newFavoriteDialog,"=================");
	var favoriteDialogs=JSON.parse(fs.readFileSync(favoriteDataFile, 'utf-8'));
	var date = new Date().Format("yyyy/MM/dd");
	var favorId=newFavoriteDialog.id;	
	if(favorId==undefined){
		
	    var idString = date + (Math.floor(1000*(1+Math.random())));
        newFavoriteDialog.id=idString;
    	newFavoriteDialog.type=2;
    	newFavoriteDialog.createDate=date;
    	favoriteDialogs.push(newFavoriteDialog);
    	fs.writeFileSync(favoriteDataFile,JSON.stringify(favoriteDialogs));
    	res.send( {"errCode":"0","errMsg":"","document":newFavoriteDialog});	
	}else{	
		var i=0;		
		for(i=0;i<favoriteDialogs.length;i++){
			if(favoriteDialogs[i].id==newFavoriteDialog.id){
				favoriteDialogs.splice(i,1,newFavoriteDialog);
			}
		}
        console.log(favoriteDialogs);
    	fs.writeFileSync(favoriteDataFile,JSON.stringify(favoriteDialogs));
    	res.send( {"errCode":"0","errMsg":"","document":newFavoriteDialog});
	}
    
});

app.post('/apis/favorite/deleteFavorites', function (req, res) {
	var idString=req.body.ids;
	var favoriteDialogs=JSON.parse(fs.readFileSync(favoriteDataFile, 'utf-8'));
	var lengths=favoriteDialogs.length;
	//console.log("========原来条数======",lengths);
	var i=0;
	var j=0;
	for(i=0;i<idString.length;i++){
		for(j=0;j<favoriteDialogs.length;j++){
			if(idString[i]==favoriteDialogs[j].id){
				favoriteDialogs.splice(j,1);
			}
		}
	}
	newarr=favoriteDialogs.splice(10,1);
	console.log("======后来条数========",favoriteDialogs.length);
    fs.writeFileSync(favoriteDataFile,JSON.stringify(favoriteDialogs));
    var result = {data:"success"};
    res.send(result);
});

app.post('/apis/favorite/copyToMaterial', function (req, res) {
    console.log("ids=",req.body.ids);
    var result = {data:"success"};
    res.send(result);
});

//没有完成
app.post('/apis/favorite/saveDragDrop', function (req, res) {
    
    var jsonobj=JSON.parse(fs.readFileSync(favoriteDataFile, 'utf-8'));
 	var id=req.body.docid;
 	var tarid=req.body.targetid;
    console.log(id);//数组
    console.log(tarid);//文件夹json文件
    console.log(jsonobj);
 	
    var files = {data:[]};
 	if(jsonobj[id]){
    	files.data = jsonobj[id];
    }
    var i=0;
    var jsonDoc;
    for(i=0;i<jsonobj.length;i++){
    	var jsonmin=jsonobj[i];
    	if(jsonmin.id===id){
    		jsonDoc=jsonmin;
    		break;
    	}
    }
    console.log(jsonDoc);
    
    var j=0;
    var jsonTag;
    for(j=0;j<jsonobj.length;j++){
    	var jsonmax=jsonobj[j];
    	if(jsonmax.id===tarid){
    		jsonTag=jsonmax;
    		break;
    	}
    }
    console.log(jsonTag);
    //jsonTag["json"]
//  console.log("-----------------",jsonTag);
//  console.log("+++++++++++++++",jsonTag["json"]);

    //var a=jsonTag["json"];

    
    
    var result = {data:"success"};
    res.send(result);
});







