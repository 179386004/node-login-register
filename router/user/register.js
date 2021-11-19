// 导入模型
const { User } = require('../../database/model/User')
module.exports = async (req, res) => {
    // 接收传递过来的参数
    const { username, password } = req.body
    // 根据用户名查询用户是否存在
    const model = await User.findOne({ where: { username } })
    // 判断用户名是否存在 如果存在 直接返回
    if (model) {
        return res.status(400).send({
            data: null,
            meta: {
                msg: "用户名已存在！",
                status:400
            }
        })
    }
    // 创建用户
    const CreateUser = await User.create({ username, password })
    res.status(201).send({
        data: CreateUser,
        meta: {
            msg: "创建成功",
            status:201
        }
    })
}
