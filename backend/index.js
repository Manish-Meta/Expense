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
const feedback_router=require('./router/feedback.js')
const handle_error=require('./utils/handle_error.js');
const file_not_found = require('./utils/file_not_fount.js');
const email_route=require('./router/emailRoute.js')
const org_router=require('./router/org.js')


const set_limit=limit({
    windowMs:10*60*1000,
    max:30,
    message:'Too many request'
})

app.use(express.json())
app.use(cookie_parser())
// app.use(set_limit)
const url=['http://localhost:5174','http://localhost:5173']
let method=['GET','POST','DELETE','PATCH','PUT']
app.use(cors({
    origin:url,
    methods:method,
    credentials:true
}))

// create api endpoint
app.use('/user',user_route)
app.use('/expenses',expense_route)
app.use('/roles',roles)
app.use('/dept',dept)
app.use('/send_email',email_route)
app.use('/category',category_router)
app.use('/workflow',work_flow_router)
app.use('/feedback',feedback_router)
app.use('/organization',org_router)

// handle the invalid url (File not found 404)
app.use('/',file_not_found)

// handle the error
app.use(handle_error)

app.listen(port,()=>{
    console.log("the server is ⚙️  running on ...",process.env.port)
})
