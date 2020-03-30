var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

// 开启静态资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/views/', express.static(path.join(__dirname, './node_modules/')))

// 配置模版引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由加载到 app 中
app.use(router)

// 监听端口
app.listen(3000, function () {
	console.log('running...')
})