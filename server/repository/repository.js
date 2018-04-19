
var fs = require("fs"); 
var app = require('../app');


var repositoryDataFile = __dirname + "/" + "repository.data.json";
var repository_docDataFile = __dirname + "/" + "repository_doc.data.json";
var treeDataFile = __dirname + "/" + "tree.data.json";

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

app.post('/apis/repositorys/getRepositoryList', function (req, res) {
	console.log("pram=",req.body.pram);
	var condition=req.body.pram;
  	var sortOrderBy=condition.sortOrderBy;
  	var sortName=condition.sortName;
 	var wordSoat=condition.searchWord;
	var files = JSON.parse(fs.readFileSync(repositoryDataFile, 'utf-8'));
	if(req.body.pram.docid == 'A001'|| req.body.pram.docid == 'A003'){
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
	}
	if(wordSoat){
  		files = files.filter(favoi => {
      		return favoi.title.indexOf(wordSoat.trim()) >= 0;
   		});
      	files.data=files;
    }
    res.send(files);
});

app.post('/apis/repositorys/saveRepositoryObj', function (req, res) {
  	var newMater=req.body.obj;
	var Maters=JSON.parse(fs.readFileSync(repositoryDataFile, 'utf-8'));
	var date = new Date().Format("yyyy/MM/dd");
	var favorId=newMater.id;	
	if(favorId==undefined){
	    var idString = date + (Math.floor(1000*(1+Math.random())));
        newMater.id=idString;
    	newMater.types=2;
    	Maters.time=date;
    	Maters.push(newMater);
    	fs.writeFileSync(repositoryDataFile,JSON.stringify(Maters));
    	res.send( {"errCode":"0","errMsg":"","document":Maters});	
	}else{	
		var i=0;		
		for(i=0;i<Maters.length;i++){
			if(Maters[i].id==newMater.id){
				Maters.splice(i,1,newMater);
			}
		}
        console.log(Maters);
    	fs.writeFileSync(repositoryDataFile,JSON.stringify(Maters));
    	res.send( {"errCode":"0","errMsg":"","document":newMater});
	}
});

app.post('/apis/repositorys/deleteRepositorys', function (req, res) {
	var idString=req.body.ids;
	var repositorys=JSON.parse(fs.readFileSync(repositoryDataFile, 'utf-8'));
	var lengths=repositorys.length;
	var i=0;
	var j=0;
	for(i=0;i<idString.length;i++){
		for(j=0;j<repositorys.length;j++){
			if(idString[i]==repositorys[j].id){
				repositorys.splice(j,1);
			}
		}
	}
    fs.writeFileSync(repositoryDataFile,JSON.stringify(repositorys));
    var result = {data:"success"};
    res.send(result);
});

app.get('/apis/repositorys/getRepositoryTree', function (req, res) {
	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
    res.send(treeDate);
});
