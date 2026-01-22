const {db}=require('../db/db')
const {employee_roles}=require('../model/user/emp_role')
const {roles}=require('../model/user/role')
const {profile}=require('../model/user/profile')
const {eq}=require('drizzle-orm')

const check_user=(...user_type)=>{
    return async(req,res,next)=>{
        try{
            const id=req.user
            console.log("user : ",id)
            const user=await db
            .select({role_name: roles.role_name })
            .from(employee_roles)
            .innerJoin(roles, eq(roles.role_id, employee_roles.role_id))
            .where(eq(employee_roles.profile_id, id));

            console.log("user : ",user)
            if(!user[0]?.role_name){
                return res.status(400).json({
                    msg:'invalid data'
                })
            }
            if(user[0]?.role_name!=user_type){
                return res.status(400).json({
                    msg:'Unauthroized person'
                })
            }
            next()
        }catch(err){
            console.log(err)
            res.status(500).json({
                msg:'internal server error'
            })
        }
    }
}

module.exports=check_user