// 模拟后台服务
// 对应前端的service请求

var fs = require("fs");
var app = require('../app');

// 数据文件，模拟用户表
var dataFile = __dirname + "/" + "user.data.json";
// 当前登陆用户文件，模拟token，模拟时只能单用户登陆
var currentUserFile = __dirname + "/" + "currentuser.data.json";

// HTTP GET
// 登陆画面初始化：取得验证码图标
//  应该保存验证码图标信息，供后续的login检查使用，这里固定。
app.get('/apis/login-init', function (req, res) {
  console.log(req.url);
  var validatorCodeUrl = {"status":{"code":"0"},"validatorUrl":"/public/assets/img/login/validationRight.png"};
  res.send(validatorCodeUrl);
});

app.get('/apis/v1/logininfo/get', function (req, res) {
  var validatorCodeUrl = {"userName":"DF0001","userseqid":"10001"};
  console.log(validatorCodeUrl);
  res.send(validatorCodeUrl);
});

//用户登录判断
app.get('/login/:userId', function (req, res) {
	// 读取用户信息
  var users = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  // 从HTTP BODY中读取客户端的请求信息
  var data = req.body;

  //筛选用户信息
  var index = users.findIndex(element => {
    return (element.userId === data.userId);
  });

	if( index != -1) {
		res.send('{"errCode":0,"message":""}');
	} else {
		res.send('{"errCode":0,"message":"登录信息不正确，请重新输入！"}');
	}
  return;
})

// 角色选择初期化(后台对接)
app.get('/persons/:id', function (req, res) {

  // 读取用户信息
  //var users = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  // 从HTTP BODY中读取客户端的请求信息
  //var data = req.body;

  //筛选用户信息
  //var userId = req.params.id;
  //var index = users.findIndex(element => {
  //  return (element.userId === userId);
  //});

  //data.user = users[index];
  //data.user.personId = data.user.userId;
  //data.user.personName = data.user.userName;
  //data.user.roleList = data.user.userOrgRoles;
  //for (var i=0; i < data.user.roleList.length; i++) {
  //  data.user.roleList[i].orgRoleName = data.user.roleList[i].roleName;
  //}
  
  var retVal = '{"errCode":0,"message":"","personInfoEntity":{"personId":"jjz","personName":"京记者","sex":"1","age":null,"birthday":374860800000,"departmentId":"3002","departmentName":"北京分社","sequence":"/1001/2002/3002","duty":null,"officePhone":null,"mobile":null,"email":null,"openFlg":null,"individualitySignature":null,"address":null,"iconUrl":null,"subAccount":null,"subToken":null,"voipAccount":null,"voipPwd":null,"delFlg":null,"creater":null,"createTime":null,"updater":null,"updateTime":null,"roleList":[{"roleId":"020001","roleName":"记者","roleType":"2","description":"报道策划的角色","creater":null,"createTime":null,"updater":null,"updateTime":null,"delFlg":"0"}]}}'
  
  console.log(retVal);

  res.send(retVal);
  
  return;
})

// HTTP POST
// 用户角色选择
app.post('/api/user/roleselect', function (req, res) {

  // 读取用户信息
  var users = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  // 从HTTP BODY中读取客户端的请求信息
  var data = req.body;

  fs.writeFileSync(currentUserFile, JSON.stringify(data));

  res.send("0");
  return;

});
