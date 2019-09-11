/**
 * Created by free on 16/11/5.
 */
var fs = require("fs"); 
var app = require('../app');


var subscriptionDataFile = __dirname + "/" + "subscription.data.json";
var subscriptionMultipleDataFile = __dirname + "/" + "subscription_Multiple.data.json";
var subscriptionFilesDataFile = __dirname + "/" + "subscription_file.data.json";

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

app.get('/apis/subscription/searchSubscription', function (req, res) {
  var subscriptions = JSON.parse(fs.readFileSync(subscriptionDataFile, 'utf-8'));
  res.send(subscriptions);
});

app.post('/apis/subscription/filterCountryMultiple', function (req, res) {
    var word = req.body.word;
    var jsonobj = JSON.parse(fs.readFileSync(subscriptionMultipleDataFile, 'utf-8'));
    res.send(jsonobj);
});

app.post('/apis/subscription/searchSubscriptionFiles', function (req, res) {
   
  	var jsonobj = JSON.parse(fs.readFileSync(subscriptionFilesDataFile, 'utf-8'));
 	var condition=req.body.obj;//
 	var id=condition.id;
  	var sortOrderBy=condition.sortOrderBy;
  	var sortName=condition.sortName;
 	var wordSoat=condition.searchWord;
	
	console.log(jsonobj);
 	var files = {data:[]};
    console.log("+++++++++++++",wordSoat);
    console.log("+++++++++++++",files);
 	if(jsonobj[id]){
    	files.data = jsonobj[id];
    }
 	
 	if (sortOrderBy) {
 		filess=files.data;
  		var order = sortOrderBy%2 == 0?'asc':'desc';
   		filess = filess.sort((a,b) => {
      	if (order === 'asc') {
        	return a[sortName] > b[sortName];
      	} else {
       		return a[sortName] < b[sortName];
      	}
      	files.data=filess;
     });
    }
 	if(wordSoat){
 		filess=files.data;
  		filess = filess.filter(favoi => {
      		return favoi.titleName.indexOf(wordSoat.trim()) >= 0;
   		});
   		console.log(filess);
      	files.data=filess;
    }
  				
    res.send(files);
});

app.post('/apis/subscription/saveSubscriptionObj', function (req, res) {
    var newSub=req.body.obj;
	console.log(newSub,"=================");
	var favoriteDialogs=JSON.parse(fs.readFileSync(subscriptionDataFile, 'utf-8'));
	var date = new Date().Format("yyyy/MM/dd");
	var favorId=newSub.id;	
	if(favorId==undefined){
		
	    var idString = (Math.floor(1000*(1+Math.random())));
        newSub.id=idString;
    	newSub.type=2;
    	newSub.createDate=date;
    	favoriteDialogs.push(newSub);
    	fs.writeFileSync(subscriptionDataFile,JSON.stringify(favoriteDialogs));
    	res.send( {"errCode":"0","errMsg":"","document":newSub});	
	}else{	
		var i=0;		
		for(i=0;i<favoriteDialogs.length;i++){
			if(favoriteDialogs[i].id==newSub.id){
				favoriteDialogs.splice(i,1,newSub);
			}
		}
    	fs.writeFileSync(subscriptionDataFile,JSON.stringify(favoriteDialogs));
    	res.send( {"errCode":"0","errMsg":"","document":newSub});
	}
});
app.post('/apis/subscription/calcelById', function (req, res) {
    var id=req.body.id;
    console.log("id=================",id);
    var favoriteDialogs=JSON.parse(fs.readFileSync(subscriptionDataFile, 'utf-8'));
    var favorId=id;	
    console.log("之前+++++++++",favoriteDialogs.length);
    //console.log(favoriteDialogs);
  
    var i=0;		
	for(i=0;i<favoriteDialogs.length;i++){
		console.log("dsfsdfsdfa");
		console.log(favoriteDialogs[i].id);
		if(favoriteDialogs[i].id==favorId){
			console.log("dsfsdfsdfa");
			favoriteDialogs.splice(i,1);
		}
	}
  
    console.log("之后+++++++++",favoriteDialogs.length);
    fs.writeFileSync(subscriptionDataFile,JSON.stringify(favoriteDialogs));
    var result = {data:"success"};
    res.send(result);
    
	
	
});

app.post('/apis/subscription/copyToMaterial', function (req, res) {
//  console.log("ids=",req.body.ids);
    var result = {data:"success"};
    res.send(result);
});



