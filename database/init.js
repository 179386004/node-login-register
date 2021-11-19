const Sequelize  = require('sequelize')


const sequelize = new Sequelize('summer','root','A211435a',{
    host:'localhost',
    dialect:'mysql',
    port:'3306'
})

sequelize.authenticate().then(()=>{
    console.log('连接成功了');
})
.catch(err=>{
    console.error(err);
})
//
module.exports = {Sequelize,sequelize}