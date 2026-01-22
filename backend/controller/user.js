const {db}=require('../db/db')
const {profile}=require('../model/user/profile')
const {user}=require('../model/user/user')
const {sql,eq}=require('drizzle-orm')
const {DrizzleQueryError}=require('drizzle-orm')
const {encrypt,decrypt} = require('../midleware/pass_enc')
const {token_generate} = require('../midleware/jwt')
const {roles} = require('../model/user/role')
const { employee_roles } = require('../model/user/emp_role')
const { dept } = require('../model/user/dept')
const {allow_category}=require('../model/user/allowed_category')
const {employee_config}=require('../model/user/emp_config')
const {valitador_config}=require('../model/user/validator_config')

const signup=async(req,res)=>{
    try{
        const {emp_id,email,dept_id,full_name,emp_status,welcome_email}=req.body
        if(!emp_id||!email||!dept_id||!full_name||!emp_status){
            return res.status(400).json({
                msg:"Invalid data"
            })
        }
       let finish=await db.transaction(async(table)=>{
        const user_detail=await table.select().from(profile).where(eq(profile.profile_id,emp_id))
        if(user_detail.length!=0){
            return res.status(400).json({
                msg:"The user already existing"
            })
        }
        const role_detail=await table.select({role_id:roles.role_id}).from(roles).where(eq(roles.role_name,emp_status))
         if(!role_detail){
            return res.status(404).json({
                     msg:'Invalid role or something went wrong'
                    })
         }
         const pro=await table.insert(profile).values({
             profile_id:emp_id,
             email:email,
             full_name:full_name,
             username:full_name,
             dept_id:dept_id,
        })
           
           
        const emp_role_detail=await table.insert(employee_roles).values({profile_id:emp_id,role_id:role_detail[0].role_id})
        if(emp_status=='employee'){
            const {reporting_manager,expense_limit,allow_cat}=req.body;
            if(!reporting_manager||!expense_limit||!allow_cat){
                return res.status(400).json({
                    msg:"Invalid data"
                })
            }
            const emp=await table.insert(employee_config).values({
                profile_id:emp_id,
                reporting_manager:reporting_manager,
                monthly_limit:expense_limit
            })

            const cat=await table.insert(allow_category).values({
                profile_id:emp_id,
                category:allow_cat
            });

            if(!emp||!cat){
                table.rollback()
                return res.status(400).json({
                    msg:"Invalid data"
                })
            }
        }else if(emp_status=='validator'){
            const {validator_scope,approve_limit,priority_level,notify}=req.body;
            if(!validator_scope||!approve_limit||!priority_level){
                return res.status(400).json({
                    msg:"Invalid data"
                })
            }
            const val=await table.insert(valitador_config).values({
                profile_id:emp_id,
                validation_scope:validator_scope,
                approval_limit:approve_limit,
                priority_level:priority_level,
                notify:notify
            })
            if(!val){
                table.rollback();
                return res.status(400).json({
                    msg:"Invalid data"
                })
            }
        }else{
            const {password}=req.body
            const hashpass=await encrypt(password)
            let value=await table.select({user_id:user.user_id}).from(user)
            let value_id='U_111111'
            if(value[value.length-1]){
                let gen_id=value[value.length-1].user_id.split('_')[1]
                value_id=`U_${Number(gen_id)+1}`
            }
            const data=await table.insert(user).values({profile_id:emp_id,password_hash:hashpass,user_id:value_id})
            if(!data){
                table.rollback()
                return res.status(400).json({
                    msg:'something went wrong'
                })
            }
        }
        if(!pro){
            table.rollback()
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        
        return true
    })
    
    if(!finish){
        return res.status(400).json({
            msg:'Invalid data'
        })
    }
    res.status(200).json({
        msg:"user inserted"
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal err"
        })
    }
}

 const login=async(req,res)=>{
    try{
        const {emp_id,password,emp_status}=req.body;
        if(!emp_id||!password||!emp_status){
            return res.status(400).json({
                msg:"Some data missing"
            })
        }
        const details=await db.select({roles:roles}).from(profile)
        .innerJoin(employee_roles,eq(employee_roles.profile_id,emp_id))
        .innerJoin(roles,eq(roles.role_id,employee_roles.role_id))
        .where(eq(profile.profile_id,emp_id))
        if(!details || details[0].roles.role_name!=emp_status){
            res.status(403).json({
                msg:"Unauthorzied Access"
            })
            return
        }

        const user_detail=await db.select().from(user).where(eq(user.profile_id,emp_id))
        if(user_detail.length==0){
            res.status(404).json({
                msg:"User not found"
            })
            return
        }
        const pass=await decrypt(password,user_detail[0].password_hash)
        if(!pass){
            res.status(400).json({
                msg:"invalid credential"
            })
            return
        }
        let val=token_generate(user_detail[0].profile_id,res)
        if(!val){
            return res.status(400).json({
                msg:'Something Wrong'
            })
        }
        res.status(200).json({
            msg:"user logined successfully",
            token:val
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server err"
        })
    }
}

const forget_pass=async(req,res)=>{

}

 const my_profile=async(req,res)=>{
    try{
        const id = req.user
        const result=await db.select({profile:profile,dept_name:dept.name,roles_name:roles.role_name}).from(profile)
        .innerJoin(dept,eq(dept.deptartment_id,profile.dept_id))
        .innerJoin(employee_roles,eq(employee_roles.profile_id,id))
        .innerJoin(roles,eq(employee_roles.role_id,roles.role_id))
        .where(eq(profile.profile_id,id))
        if(!result){
            return res.status(404).json({
                msg:"user not found"
            })
        }
        res.status(200).json({
            msg:"user found",
            data:result
        })
    }catch(err){
        console.log("err : ",err)
        res.status(500).json({
            msg:"internal server err"
        })
    }
}

 const logout=(req,res)=>{
    res.cookie('token','',{
        maxAge:0,
        sameSite:'none',
        secure:true
    }).status(200).json({
        msg:'user logout'
    })
}
const user_overview=async(req,res)=>{
    
    try{
        const total=await db.select({count:sql`count(*)`}).from(profile)
        const active=await db.select({count:sql`count(*)`}).from(profile).where(eq(profile.profile_status,true))
        const pending=await db.select({count:sql`count(*)`}).from(profile).where(eq(profile.profile_status,false))
        const role_dist=await db.select({role_name:roles.role_name,count:sql`count(${employee_roles.profile_id})`}).from(employee_roles).innerJoin(roles,eq(employee_roles.role_id,roles.role_id)).groupBy(roles.role_name)
        res.status(200).json({
            total_users:Number(total[0].count),
            active_users:Number(active[0].count),
            pending_users:Number(pending[0].count),
            role_distribution:role_dist
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Internal Server Error"
        });
    }

};
module.exports={signup,login,logout,my_profile,user_overview}
