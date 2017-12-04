var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html;charset=utf-8'
	})
	if (req.url === '/') {
		fs.readFile('./www/views/index.html', function (err, data) {
			if (err) {
				console.log(err)
			}
			res.end(data);
		})
	} else if (req.url.startsWith('/static') || req.url.startsWith('/views')) {
		var staticFilePath = './www' + req.url;
		fs.readFile(staticFilePath, function (err, data) {
			if (err) {
				res.writeHead(404)
				console.log(err)
			}
			res.end(data);
		})
	} else if (req.url.startsWith('/user')) {
		//GET
		//获取路径所有信息(true可以将query信息转化为json格式)
		var obj = url.parse(req.url, true);
		//路径提交地址
		var path = obj.pathname;
		//路径参数json格式
		var GET = obj.query;
		//POST
		// 定义了一个post变量，用于暂存请求体的信息
		var POST = '';
		// 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
		req.on('data', function (data) {
			POST+=data;
		})
		// 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
		req.on('end', function () {
			POST = querystring.parse(POST);
			console.log(path, GET, POST);
			var testData1=[1,2]
			var testData2=[1,12,123]
			var Points=0;
			for(var i=0;i<testData1.length;i++){
				if(testData1[i]==POST['radio'+i]){
					Points+=2;
				}
			}
			for(var i=0;i<testData2.length;i++){
				if(POST['checkbox'+i]){
					var Cpoints=POST['checkbox'+i].toString().replace(/[,]/g,'');
				}
				if(testData2[i]==Cpoints){
					Points+=3;
				}
			}
			res.write('您的分数是:'+Points+'分');
//			switch (POST.act) {
//				case 'reg':
//					//1.检查用户名是否已经有了
//					if (users[POST.username]) {
//						res.write('{"ok": false, "msg": "此用户已存在"}');
//					} else {
//						//2.插入users
//						users[POST.username] = POST.password;
//						res.write('{"ok": true, "msg": "注册成功"}');
//					}
//					break;
//				case 'login':
//					//1.检查用户是否存在
//					if (users[POST.username] == null) {
//						res.write('{"ok": false, "msg": "此用户不存在"}');
//					//2.检查用户密码
//					} else if (users[POST.username] != POST.password) {
//						res.write('{"ok": false, "msg": "用户名或密码有误"}');
//					} else {
//						res.write('{"ok": true, "msg": "登录成功"}');
//					}
//					break;
//				default:
//					res.write('{"ok": false, "msg": "未知的action"}');
//			}
			res.end()
		})
	} else {
		res.writeHead(404)
		res.end('404 not found')
	}
}).listen(80)

console.log('running ok')
/*
//服务器模块
var http = require('http');

http.createServer(function (request, response) {
	//request是一个请求对象，可以获取到请求路径、请求方法等
	//response是一个响应对象，可以给请求发送响应
	console.log('收到客户端请求了')
	console.log('当前请求对象的路径是'+request.url)
	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain   text/html
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});
	//发送数据
	response.write('1111111111111111111111');
	response.write('2222222222222222222222');
	// 发送数据完毕后，主动结束响应
	response.end('<h1>Hello World</h1>');
}).listen(80)

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
*/

/*
//文件读写模块
var fs=require('fs');
//文件写入（路径，写入的数据，回调函数）
fs.writeFile('a.txt','helloe aa',function(err){
	if(err){
		return console.log('写入文件失败')
	}
	console.log('写入文件成功')
})
//文件读取
fs.readFile('b.txt',function(err,data){
	if(err){
		throw err;
	}
	console.log(data.toString());
})
*/
