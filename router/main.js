const express = require('express')

const main = express.Router()

main.post('/register',require('./user/register'))
main.post('/login',require('./user/login'))

main.get('/index',(req,res)=>{
    res.send('summer')
})

module.exports = main