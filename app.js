//导入express模块
const jwt = require('jsonwebtoken')
const express =require('express')
const app = express()

//导出接受post请求数据模块
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const main = require('./router/main')
require('./database/init')

// 设置跨域和相应数据格式  
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/ else next()
})



app.get('/',(req,res)=>{
    res.status(404).send({
        data:null,
        meta:{
            msg:'not Found',
            status:404
        }
        
    })
})

//  拦截 /api 下的所有请求 验证 token
app.use('/api', (req, res, next) => {
    // 判断是否是 注册接口 或 登陆接口 如果是 直接放行
    if (req.url == '/register' || req.url == '/login') {
        next()
        return
    }
    // 接收客户端传递过来的 token
    const token = String(req.headers.authorization)
    // 根据 客户端传递过来的 token 进行 解密，解密成功返回一个对象，解密失败直接返回 null
    // 第一个参数是 token 第二个是 私钥 自己定义 
    const username = jwt.decode(token, 'xiaoke')
    // 判断是否传递 token 和 判断 token 是否 正确
    if (token == 'undefined' || username == null) {
        res.status(400).send({
            data: null,
            meta: {
                msg: '无效token',
                status: 400,
            }
        })
        return
    }
    // token 正确 放行
    next()
})

require('./database/model/User')

//为main 匹配地址 /api
app.use('/api',main)

app.listen(8810)