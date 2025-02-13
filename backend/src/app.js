const exp=require('express')
const app=exp()
const route=require('./routes/index')
const path=require('path')
app.use("/img-product", exp.static(process.cwd()+"/public/image/product"));
app.use("/img-user", exp.static(process.cwd()+"/public/image/user"));

app.use('/',route)

module.exports=app