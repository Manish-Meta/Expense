const {db} = require('../db/db.js')

const new_expense=async(req,res)=>{
    try{
        const {amount,category,vendor,purpose}=req.body
        const id=req.user
        const expense=await db.query('INSERT INTO expense (exp_id,emp_id,vendor,bus_purpose,amount,category) VALUES($1,$2,$3,$4,$5,$6)',[12,id,vendor,purpose,amount,category,])
        if(!expense.rows){
            console.log("err : ",expense)
            res.status(400).json({
                msg:"missing..."
            })
        }
        res.status(200).json({
            msg:"uploaded"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server err"
        })
    }
}

const my_expenses=async(req,res)=>{
    try{
        const id=req.user
        console.log(id)
        const expenses=await db.query('SELECT * FROM expense WHERE emp_id=$1',[id])
        console.log(expenses.rows)
        if(!expenses.rows){
            res.status(200).json({
                msg:"No expenses"
            })
            return
        }
        res.status(201).json({
            msg:"your expenses",
            data:expenses.rows
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal err"
        })
    }
}

const show_all_expenses=async(req,res)=>{
    try{
        const expenses=await db.query('SELECT * FROM expense')
        if(!expenses.rows){
            res.status(200).json({
                msg:"The expense and the expense is empty"
            })
        }
        res.status(201).json({
            msg:"expense",
            data:expenses.rows
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error"
        })
    }
}

const validate_status=async(req,res)=>{
    try{
        const {status}=req.body
        const {expense_id}=req.params
        await db.quary('UPDATE TABLE_NAME SET validate_status=$1 WHERE id=$2',[status,expense_id])
        res.status(200).json({
            msg:"finished"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Internal server error"
        })
    }
}

const admin_status=async(req,res)=>{
    try{
        const {pay_method,ref_num,pay_date,msg=''}=req.body
        const {id}=req.params
        await db.query('UPDATE TABLE_NAME SET pay_date=$1 AND ref_num=$2 AND pay_method=$3 AND msg=$4 status=approved WHERE id=$5',[pay_date,ref_num,pay_method,msg,id])
        res.status(200).json({
            msg:"status changed"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error"
        })
    }
}

const status_reject=async(req,res)=>{
    try{
        const {msg=''}=req.body
        const {id}=req.params
        await db.quary('UPDATE TABLE_NAME SET status=reject AND msg=$1 WHERE id=$2',[msg,id])
        res.status(200).json({
            msg:"status changed"
        })
    }catch(err){
        console.log(err)
        res.status(500).json("internal server err")
    }
}

const req_information=async(req,res)=>{
    const client_id=req.quary
    
}

module.exports={new_expense,my_expenses,show_all_expenses,validate_status,admin_status,status_reject,req_information}