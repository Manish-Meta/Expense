const { eq } = require('drizzle-orm')
const {db}=require('../db/db')
const {roles}=require('../model/user/role')

const add_roles=async(req,res,next)=>{
    try{
        const {role_id,role_name,des}=req.body
        const value=await db.insert(roles).values({role_id:role_id,role_name:role_name,description:des})
        if(!value){
            res.status(400).json({
                msg:"something went wrong"
            })
            return
        }
        res.status(201).json({
            msg:"the role added"
        })
    }catch(err){
        next(err)
    }
}

const delete_role=async(req,res,next)=>{
    try{
        const {id}=req.params
        if(!id){
            res.status(400).json({
                msg:"Invalid data"
            })
        }
        const value=await db.delete(roles).where(eq(roles.role_id,id))
        console.log(value.rows)
        res.status(202).json({
            msg:"The data deleted"
        })
    }catch(err){
        next(err)
    }
}

module.exports={add_roles,delete_role}