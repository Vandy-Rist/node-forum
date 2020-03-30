var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
	res.render('index.html')
})

router.get('/login', function (req, res) {
	res.render('login.html')
})

router.post('/login', function (req, res) {
	
})

router.get('/register', function (req, res) {
	res.render('register.html')
})

router.post('/register', function (req, res) {
	// 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body
  User.findOne({
  	$or: [
  		{email: body.email},{nickname: body.nickname}
  	]
  }, function (err, data) {
  	if (err) {
  		return res.status(500).json({
  			success: false,
  			message: '服务端错误'
  		})
  	}
  	if (data) {
  		// 邮箱或者昵称已存在
  		return res.status(200).json({
  			err_code: 1,
  			message: 'Email or nickname aleady exists.'
  		})
  		return res.send('邮箱或者密码已存在，请重试')
  	}
  	

  })

})

router.get('/logout', function (req, res) {

})

module.exports = router