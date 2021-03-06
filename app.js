var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var router = require('./router')

var app = express()

// 开启静态资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 配置模版引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))
app.set('view engine', 'html')

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 配置 express-session
app.use(session({
	secret: 'itcast',
	resave: false,
	saveUninitialized: false
}))

// 把路由加载到 app 中
app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req,res) {
	res.render('404.html')
})
// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
	res.status(500).json({
		err_code: 500,
		message: err.message
	})
})

// 监听端口
app.listen(3000, function () {
	console.log('running...')
})
