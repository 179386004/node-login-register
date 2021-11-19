const { User } = require('../../database/model/User')
// 导入 token 模块
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {
    const { username, password } = req.body
    // 根据用户名查询用户是否存在
    const findUser = await User.findOne({ where: { username } })
    if (!findUser) {
         res.status(400).send({
            data: null,
            meta: {
                msg: "用户不存在！",
                status:400
            }
        })
        return
    }

    if(username != findUser.username || password!=findUser.password){
        res.status(400).send({
            data: null,
            meta: {
                msg: "账号或密码不正确！",
                status:400
            }
        })
        return
    }
    // 登陆成功创建token返回给客户端
    // 第一个参数是组 第二个参数是私钥(自己随便定义)
    const token = jwt.sign({username},'xioahu')

    res.status(400).send({
        data: {
            username:username,
            token

        },
        meta: {
            msg: "登陆成功！",
            status:200
        }
    })

 
}