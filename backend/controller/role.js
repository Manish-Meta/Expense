const {db}=require('../db/db')


const add_roles=async(req,res)=>{
    try{
        const {role_id,role_name,des}=req.body
        const date=new Date()
        const value=await db.query('INSERT INTO roles (role_id,role_name,description,created_at,updated_at) VALUES($1,$2,$3,$4,$5)',[role_id,role_name,des,date,date])
        if(!value.rows){
            res.status(400).json({
                msg:"something went wrong"
            })
            return
        }
        res.status(201).json({
            msg:"the role added"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
                msg:"Internal server err"
        })
    }
}

const delete_role=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            res.status(400).json({
                msg:"Invalid data"
            })
        }
        const value=await db.query('DELETE FROM roles WHERE role_id=$1',[id])
        console.log(value.rows)
        res.status(202).json({
            msg:"The data deleted"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Internal server error"
        })
    }
}

module.exports={add_roles,delete_role}