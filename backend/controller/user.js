const {db} = require('../db/db')
const {encrypt,decrypt} = require('../midleware/pass_enc')
const {token_generate} = require('../midleware/jwt')

const signup=async(req,res)=>{
    try{
        const {emp_id,username,email,first_name,last_name,full_name,designation,employee_status,password}=req.body
        const user=await db.query('SELECT * FROM employees WHERE employee_id=$1',[emp_id])
        console.log(user.rows,"user")
        if(user.rows.length!=0){
            res.status(400).json({
                msg:"The user already existing"
            })
            return
        }
        const hash_pass=await encrypt(password)
        const date=new Date()
        const new_user=await db.query('INSERT INTO employees VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[emp_id,username,email,first_name,last_name,full_name,designation,employee_status,date,date])
        const cre_det=await db.query('INSERT INTO emp_cre (employee_id,password_hash) VALUES($1,$2)',[emp_id,hash_pass])
        console.log(cre_det.rows," : cre ")
        res.status(200).json({
            msg:"The user signed successfully",
            data:new_user.rows
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal err",
            err:err
        })
    }
}

 const login=async(req,res)=>{
    try{
        const {emp_id,password}=req.body;
        const user=await db.query('SELECT * FROM emp_cre WHERE employee_id=$1',[emp_id])
        if(user.rows.length==0){
            res.status(404).json({
                msg:"User not found"
            })
            return
        }
        const pass=await decrypt(password,user.rows[0].password_hash)
        if(!pass){
            res.status(400).json({
                msg:"invalid credential"
            })
            return
        }
        token_generate(user.rows[0].employee_id,res)
        res.status(200).json({
            msg:"user logined successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server err"
        })
    }
}

 const profile=async(req,res)=>{
    try{
        const id = req.user
        console.log(id)
        const qur=`SELECT
                    e.employee_id,
                    d.name  AS department,
                    e.full_name  AS employee_name,
                    r.role_name
                    FROM employees e
                    JOIN emp_cre ec
                        ON ec.employee_id = e.employee_id
                    LEFT JOIN departments d
                        ON d.dept_id = e.dept_id
                    JOIN employee_roles er
                        ON er.employee_id = e.employee_id
                    JOIN roles r
                        ON r.role_id = er.role_id
                    WHERE e.employee_id =$1;`
        const user=await db.query(qur,[id])
        console.log(user.rows)
        if(!user.rows){
            res.status(404).json({
                msg:"user not found"
            })
        }
        res.status(200).json({
            msg:"user finded",
            data:user.rows
        })
    }catch(err){
        console.log("err : ",err)
        res.status(500).json({
            msg:"internal server err"
        })
    }
}

 const logout=(req,res)=>{
    res.cookie('token','',{maxAge:0}).status(200).json({
        msg:'user logout'
    })
}

 const edit_profile=async(req,res)=>{
    try{
        const {name,email,phno}=req.body
        const id=req.user
        const user=(await db.query('SELECT * FROM employees WHERE id=$1',[id])).rows[0]
        const data=await db.query('UPDATE employees SET name=$1,email=$2, phno=$3 WHERE employee_id=$4',[name||user.name,email||user.email,phno||user.phno,id])
        if(!data.rows){
            res.status(404).json({
                msg:"user not found"
            })
        }
        res.status(200).json({
            msg:"the profile updated"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error"
        })
    }
}
module.exports={signup,login,profile,logout,edit_profile}