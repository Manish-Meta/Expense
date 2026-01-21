require('dotenv').config()
const express=require('express')
const app=express()
const user_route=require('./router/user_route.js');
const expense_route=require('./router/expense_route.js')
const cors=require('cors');
const cookie_parser=require('cookie-parser')
const roles=require('./router/router_for_role.js')
const dept=require('./router/dept_route.js')
const limit=require('express-rate-limit')
const category_router=require('./router/category.js')
const port=process.env.port
const work_flow_router=require('./router/workflow.js')

const set_limit=limit({
    windowMs:10*60*1000,
    max:30,
    message:'Too many request'
})

app.use(express.json())
app.use(cookie_parser())
// app.use(set_limit)
const url=['http://localhost:5174','http://localhost:5173']
app.use(cors({
    origin:url,
    methods:"*",
    credentials:true
}))

app.use('/user',user_route)
// app.use('/expenses',expense_route)
app.use('/roles',roles)
app.use('/dept',dept)
app.use('/category',category_router)
app.use('/workflow',work_flow_router)

app.listen(port,()=>{
    console.log("the server is running on ...",process.env.port)
})
