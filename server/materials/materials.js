var fs = require("fs");
var app = require('../app');

var material_docDataFile = __dirname + "/" + "material_doc.data.json";
var materialDataFile = __dirname + "/" + "material.data.json";
var treeDataFile = __dirname + "/" + "tree.data.json";

//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。

app.post('/apis/materials/getMaterialList', function(req, res) {
	var condition = req.body.pram;
	var sortOrderBy = condition.sortOrderBy;
	var sortName = condition.sortName;
	var wordSoat = condition.searchWord;
	var folderid = condition.docid;

	var materials = JSON.parse(fs.readFileSync(material_docDataFile, 'utf-8'));
	var material = JSON.parse(fs.readFileSync(materialDataFile, 'utf-8'));
	var i = 0;
	var newMater = [];
	for(i = 0; i < materials.length; i++) {
		if(materials[i].folderId == folderid) {
			newMater.push(materials[i]);
		}
	}

	if(sortOrderBy) {
		let order = sortOrderBy % 2 == 0 ? 'asc' : 'desc';
		newMater = newMater.sort((a, b) => {
			if(order === 'asc') {
				return a[sortName] > b[sortName];
			} else {
				return a[sortName] < b[sortName];
			}
		});
	}
	fs.writeFileSync(materialDataFile, JSON.stringify(newMater));


	if(wordSoat){
  		newMater = newMater.filter(favoi => {
      		return favoi.title.indexOf(wordSoat.trim()) >= 0;
   		});
    }
    res.send(newMater);

});

app.post('/apis/materials/saveMaterialObj', function(req, res) {
	var newMater = req.body.obj;
	var Maters = JSON.parse(fs.readFileSync(material_docDataFile, 'utf-8'));
	var date = new Date().Format("yyyy/MM/dd");
	var favorId = newMater.id;
	if(favorId == undefined) {
		var idString = date + (Math.floor(1000 * (1 + Math.random())));
		newMater.id = idString;
		newMater.types = 2;
		Maters.time = date;
		Maters.push(newMater);
		fs.writeFileSync(material_docDataFile, JSON.stringify(Maters));
		res.send({
			"errCode": "0",
			"errMsg": "",
			"document": Maters
		});
	} else {
		var i = 0;
		for(i = 0; i < Maters.length; i++) {
			if(Maters[i].id == newMater.id) {
				Maters.splice(i, 1, newMater);
			}
		}
		console.log(Maters);
		fs.writeFileSync(material_docDataFile, JSON.stringify(Maters));
		res.send({
			"errCode": "0",
			"errMsg": "",
			"document": newMater
		});
	}
});

app.post('/apis/materials/domove', function(req, res) {
	var folderID = req.body.folderID;
	var checkMap = req.body.checkMap;

	var materials = JSON.parse(fs.readFileSync(material_docDataFile, 'utf-8'));
	for(var j = 0; j < checkMap.length; j++) {
		for(var i = 0; i < materials.length; i++) {
			if(materials[i].id == checkMap[j]) {
				materials[i].folderId = folderID;
				break;
			}
		}
	}

	fs.writeFileSync(material_docDataFile , JSON.stringify(materials));
	var result = {data: "success"};
	res.send(result);

});

app.post('/apis/materials/deleteMaterials', function(req, res) {
	var idString = req.body.ids;
	var materials = JSON.parse(fs.readFileSync(material_docDataFile, 'utf-8'));
	var lengths = materials.length;
	var i = 0;
	var j = 0;
	for(i = 0; i < idString.length; i++) {
		for(j = 0; j < materials.length; j++) {
			if(idString[i] == materials[j].id) {
				materials.splice(j, 1);
			}
		}
	}
	fs.writeFileSync(material_docDataFile, JSON.stringify(materials));
	var result = {
		data: "success"
	};
	res.send(result);
});

app.post('/apis/materials/copyToMaterial', function(req, res) {
	var result = {
		data: "success"
	};
	res.send(result);
});

app.post('/apis/materials/saveDragDrop', function(req, res) {
	var result = {
		data: "success"
	};
	res.send(result);
});
app.post('/apis/materials/domove', function(req, res) {

	let materialFileName = req.body.folderID;
	let checkMap = []
	checkMap = req.body.checkMap;
	var result = {
		data: "success"
	};
	res.send(result);

});

app.post('/apis/materials/saveMaterialFile', function(req, res) {
	let materialFileName = req.body.materialFileName;
	let filePosition = req.body.filePosition;

	var id = (Math.floor(1000 * (1 + Math.random())));

	var obj = new Object();
	obj.id = id;
	obj.name = materialFileName;
	obj.contentType = "1";
	obj.isLeaf = "1";
	obj.parentID=filePosition;
	var foldIdString=obj.id;
	obj.catalogItems = [];

	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
	function GetSubJson(treeDate, filePosition, jsona) {
		for(var i = 0; i < treeDate.length; i++) {
			if(treeDate[i].id == filePosition) {
				jsona.push(treeDate[i]);
				jsonb = jsona[0].catalogItems;
				jsonb.push(obj);
				treeDate[i].catalogItems == jsonb;
				treeDate[i].isLeaf = "0";
			} else {
				if(treeDate[i].hasOwnProperty("catalogItems")) {
					GetSubJson(treeDate[i].catalogItems, filePosition, jsona);
				}
			}
		}
	}
	var jsona = [];
	GetSubJson(treeDate, filePosition, jsona);

	fs.writeFileSync(treeDataFile, JSON.stringify(treeDate));
	var result = {
		data: "success",
		foldId:foldIdString
	};
	res.send(result);
});
app.post('/apis/materials/renameMaterialFile', function(req, res) {
	let materialFileName = req.body.materialFileName;
	let filePosition = req.body.filePosition;
	var foldIdString=filePosition;
	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
	function GetSubJson(treeDate, filePosition, jsona) {
		for(var i = 0; i < treeDate.length; i++) {
			if(treeDate[i].id == filePosition) {
				treeDate[i].name=materialFileName;
			} else {
				if(treeDate[i].hasOwnProperty("catalogItems")) {
					GetSubJson(treeDate[i].catalogItems, filePosition, jsona);
				}
			}
		}
	}
	var jsona = [];
	GetSubJson(treeDate, filePosition, jsona);

	fs.writeFileSync(treeDataFile, JSON.stringify(treeDate));
	var result = {
		data: "success",
		foldId:foldIdString
	};
	res.send(result);
});

app.post('/apis/materials/deleteFile', function(req, res) {
	var foldId = req.body.fileId;
	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
	function GetSubJson(treeDate, idString, jsona) {
		for(var i = 0; i < treeDate.length; i++) {
			if(treeDate[i].id == idString) {
				treeDate.splice(i, 1);
			} else {
				if(treeDate[i].hasOwnProperty("catalogItems")) {
					GetSubJson(treeDate[i].catalogItems, idString, jsona);
				}
			}
		}
	}
	var jsona = [];
	GetSubJson(treeDate, foldId, jsona);

	fs.writeFileSync(treeDataFile, JSON.stringify(treeDate));
	var result = {
		data: "success",
		foldIdString:foldId
	};
	res.send(result);
});


app.get('/apis/materials/getMaterialTree', function(req, res) {
	var treeDate = JSON.parse(fs.readFileSync(treeDataFile, 'utf-8'));
	res.send(treeDate);
});
