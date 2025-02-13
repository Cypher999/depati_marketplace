const exp=require('express')
const app=exp()
const route=require('./routes/index')
app.use('/',route)
module.exports=app