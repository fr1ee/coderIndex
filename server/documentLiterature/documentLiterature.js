var fs = require("fs"); 
var app = require('../app');

var documentLiteratureDataFile = __dirname + "/" + "documentLiterature.data.json";
var documentLiterature_docDataFile = __dirname + "/" + "documentLiterature_doc.data.json";
var treeDataFile = __dirname + "/" + "tree.data.json";

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

app.post('/apis/documentLiteratures/getDocumentLiteratureList', function (req, res) {
	console.log("pram=",req.body.pram);
	var condition=req.body.pram;
  	var sortOrderBy=condition.sortOrderBy;
  	var sortName=condition.sortName;
 	var wordSoat=condition.searchWord;
	var documentLiteratures = JSON.parse(fs.readFileSync(documentLiteratureDataFile, 'utf-8'));
	var files=documentLiteratures;
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

app.post('/apis/documentLiteratures/saveDocumentLiteratureObj', function (req, res) {
  	var newMater=req.body.obj;
	var Maters=JSON.parse(fs.readFileSync(documentLiteratureDataFile, 'utf-8'));
	var date = new Date().Format("yyyy/MM/dd");
	var favorId=newMater.id;	
	if(favorId==undefined){
	    var idString = date + (Math.floor(1000*(1+Math.random())));
        newMater.id=idString;
    	newMater.types=2;
    	Maters.time=date;
    	Maters.push(newMater);
    	fs.writeFileSync(documentLiteratureDataFile,JSON.stringify(Maters));
    	res.send( {"errCode":"0","errMsg":"","document":Maters});	
	}else{	
		var i=0;		
		for(i=0;i<Maters.length;i++){
			if(Maters[i].id==newMater.id){
				Maters.splice(i,1,newMater);
			}
		}
    	fs.writeFileSync(documentLiteratureDataFile,JSON.stringify(Maters));
    	res.send( {"errCode":"0","errMsg":"","document":newMater});
	}
});

app.post('/apis/documentLiteratures/deleteDocumentLiteratures', function (req, res) {
	var idString=req.body.ids;
	var documentLiteratures=JSON.parse(fs.readFileSync(documentLiteratureDataFile, 'utf-8'));
	var lengths=documentLiteratures.length;
	var i=0;
	var j=0;
	for(i=0;i<idString.length;i++){
		for(j=0;j<documentLiteratures.length;j++){
			if(idString[i]==documentLiteratures[j].id){
				documentLiteratures.splice(j,1);
			}
		}
	}
    fs.writeFileSync(documentLiteratureDataFile,JSON.stringify(documentLiteratures));
    var result = {data:"success"};
    res.send(result);
});



app.get('/apis/documentLiteratures/getDocumentLiteratureTree', function (req, res) {
	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
    res.send(treeDate);
});
