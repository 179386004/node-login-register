const {Sequelize,sequelize} =require('../init')
const User = sequelize.define('users',{
   username:{
       //定义类型
       type:Sequelize.STRING,
       allowNull:false,
       unique:true
   },
   password:{ 
    //定义类型
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
}
})

// 同步模型
User.sync().then(()=>{
    console.log('模型同步成功');
})

module.exports = {
    User
}