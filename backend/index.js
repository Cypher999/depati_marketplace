require('dotenv').config()
const port=process.env.APP_PORT;
const host=process.env.APP_HOST;
const app=require('./src/app')

app.listen(port,host,()=>{
    console.log(`server run on http://${host}:${port}`)
});