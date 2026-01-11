const express=require('express')
const app=express()
const {db}=require('./db/db.js')
const user_route=require('./router/user_route.js');
const expense_route=require('./router/expense_route.js')
const cors=require('cors');
require('dotenv').config()
const cookie_parser=require('cookie-parser')
const roles=require('./router/router_for_role.js')
const dept=require('./router/dept_route.js')
const port=process.env.port

app.use(express.json())
app.use(cookie_parser())
app.use(cors())

app.use('/user',user_route)
app.use('/expenses',expense_route)
app.use('/roles',roles)
app.use('/dept',dept)

app.listen(port,()=>{
    db.connect().then(res=>{
        console.log("DB is connected . ")
    }).catch(err=>console.log("err  : ",err))
    console.log("the server is running on ...",port,process.env.db_password)
})