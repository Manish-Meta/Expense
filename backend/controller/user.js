const {db}=require('../db/db')
const csv = require('csv-parser');
const fs = require('fs');
const {profile}=require('../model/user/profile')
const {user}=require('../model/user/user')
const {sql,eq,and, or}=require('drizzle-orm')
const {DrizzleQueryError}=require('drizzle-orm')
const {encrypt,decrypt} = require('../midleware/pass_enc')
const {token_generate} = require('../midleware/jwt')
const {roles} = require('../model/user/role')
const { employee_roles } = require('../model/user/emp_role')
const { dept } = require('../model/user/dept')
const {allow_category}=require('../model/user/allowed_category')
const {employee_config}=require('../model/user/emp_config')
const {valitador_config}=require('../model/user/validator_config')
const {signup_emp,signup_user,user_id,user_login,new_validator,login_schema}=require('../zod_schema/user_schema');


const generate_emp_id=async(req,res,next)=>{
    try{
        let emp_id='E_121111'
        let user_detail=await db.select({id:profile.profile_id}).from(profile)
        if(user_detail[user_detail.length-1]){
            user_detail=user_detail[user_detail.length-1].id.split('_')[1]
            emp_id=`E_${Number(user_detail)+1}`
        }
        return res.status(200).json({
                msg:'THIS IS THE EMP Id',
                emp_id:emp_id
        })
    }catch(err){
        next(err)
    }
}

const manager=async(req,res,next)=>{
    try{

    }catch(err){
        next(err)
    }
}

const generate_dept=async(req,res,next)=>{
    try{
        const all_dept=await db.select().from(dept)
        if(all_dept.length==0){
            return res.status(200).json({
                msg:"The dept data is empty go to add the dept"
            })
        }
        res.status(200).json({
            msg:'dept',
            data:all_dept
        })
    }catch(err){
        next(err)
    }
}

const signup=async(req,res,next)=>{
    try{
        const sighnup_cre=signup_user.safeParse(req.body)
        console.log(sighnup_cre.data)
        if(!sighnup_cre.success){
            return res.status(400).json({
                msg:'invalid data format',
                err:sighnup_cre.error

            })
        }
        const {emp_id,email,dept_id,full_name,emp_status,welcome_email}=sighnup_cre.data
        console.log(sighnup_cre.data," : success : ",sighnup_cre.success," : err : ",sighnup_cre.error)
        if(!emp_id||!dept_id||!emp_status){
            return res.status(400).json({
                msg:"Invalid data's"
            })
        }

        // insert the data
        await db.transaction(async(table)=>{

            // craete new user or new admin account
            if(emp_status!='validator'){

                // check the user already exsit or not
                const user_detail=await table.select().from(profile).where(or(eq(profile.profile_id,emp_id),eq(profile.email,email)))
                console.log(user_detail," : user")
                if(user_detail.length!=0) throw new Error('user already existing')

                // find the role detail
                const role_detail=await table.select({role_id:roles.role_id}).from(roles).where(eq(roles.role_name,emp_status))
                console.log(role_detail[0].role_id)
                if(role_detail.length==0)throw new Error('Invalid role or something went wrong')
                
                const pro=await table.insert(profile).values({
                    profile_id:emp_id,
                    email:email,
                    full_name:full_name,
                    username:full_name,
                    dept_id:dept_id,
                    })

                    const emp_role_detail=await table.insert(employee_roles).values({profile_id:emp_id,role_id:role_detail[0].role_id})
            }


            // adding the emp/validator detaile based on the emp status
                if(emp_status=='employee'){
                    const employee=signup_emp.safeParse(req.body)
                    console.log(employee.data)
                    if(!employee.success) throw new Error('Invalid data format')
                    let {reporting_manager,expense_limit,allow_cat}=employee.data;

                    if(!reporting_manager||!expense_limit||allow_cat.length==0)throw new Error('invalid data')
                    const emp=await table.insert(employee_config).values({
                        profile_id:emp_id,
                        reporting_manager:reporting_manager,
                        monthly_limit:expense_limit
                    })
                    for(let cat of allow_cat){
                        let value=await table.insert(allow_category).values({
                            profile_id:emp_id,
                            category:cat
                        });
                        if(value.rowCount==0) throw new Error('Invalid')
                    }

                    if(emp.rowCount==0) throw new Error('Invalid')
                }
            
                return
        })
        console.log("working")
        // adding emp credential like password
                const password=emp_id
                const hashpass=await encrypt(password)
                let value=await db.select({user_id:user.user_id}).from(user)
                let value_id='U_111111'
                if(value[value.length-1]){
                    let gen_id=value[value.length-1].user_id.split('_')[1]
                    value_id=`U_${Number(gen_id)+1}`
                }
                const data=await db.insert(user).values({profile_id:emp_id,password_hash:hashpass,user_id:value_id})
            
        
        if(data.rowCount==0){
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        res.status(200).json({
            msg:"user inserted"
        })
    }catch(err){
        next(err)
    }
}

const add_validator=async(req,res,next)=>{
    try{
         let validator=new_validator.safeParse(req.body)
            if(!validator.success){
                return res.status(400).json({
                    msg:'invalid data format',
                    err:validator.error
                })
            }
            const {emp_id,validator_scope,approve_limit,priority_level,emp_status,notify}=validator.data;
            console.log(validator.data)
            if(!validator_scope||!approve_limit||!priority_level||!emp_status){
                return res.status(400).json({
                    msg:"Invalid data"
                })
            }
            const user_detail=await db.select().from(profile)
            .innerJoin(employee_roles,eq(employee_roles.profile_id,emp_id))
            .innerJoin(roles,eq(employee_roles.role_id,roles.role_id))
            .where(eq(profile.profile_id,emp_id))
            console.log("user : ",user_detail)
            if(user_detail.length==0){
                return res.status(400).json({
                    msg:"user doesn\'n exsit"
                })
            }
            user_detail.map(val=>{
                if(val.roles.role_name=='validator'){
                    return res.status(400).json({
                        msg:"The user existed on validator"
                    })
                }
            })
            
            const result=await db.transaction(async(table)=>{
                const val=await table.insert(valitador_config).values({
                    profile_id:emp_id,
                    validation_scope:validator_scope,
                    approval_limit:approve_limit,
                    priority_level:priority_level,
                    notify:notify
                })

                const role_detail=await table.select({role_id:roles.role_id}).from(roles).where(eq(roles.role_name,emp_status))
                console.log(role_detail[0].role_id)
                if(role_detail.length==0){
                    table.rollback()
                    return res.status(404).json({
                        msg:'Invalid role or something went wrong'
                    })
                }

                const emp_role_detail=await table.insert(employee_roles).values({profile_id:emp_id,role_id:role_detail[0].role_id})
                if(!val){
                    table.rollback();
                    return res.status(400).json({
                        msg:"Invalid data"
                    })
                }
                return true
            })
            if(!result){
                return res.status(400).json({
                    msg:"Bad request"
                })
            }
            res.status(200).json({
                msg:'validator added'
            })
    }catch(err){
        next(err)
    }        
}

 const login=async(req,res,next)=>{
    try{
        const {emp_id,password,emp_status}=req.body;
        // if(!emp_id||!password||!emp_status){
        //     return res.status(400).json({
        //         msg:"Some data missing"
        //     })
        // }
        const details=await db.select({roles:roles.role_name}).from(profile)
        .innerJoin(employee_roles,eq(employee_roles.profile_id,emp_id))
        .innerJoin(roles,eq(roles.role_id,employee_roles.role_id))
        .where(eq(profile.profile_id,emp_id))
        console.log("detail : ",details)
        if(details.length==0){
            res.status(403).json({
                msg:"Unauthorzied Access"
            })
            return
        }
        let check=false
        for(let val of details){
            if(val.roles==emp_status){
                check=true
                break
            }
        }
        if(!check){
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
        if(user_detail[0].is_locked){
            return res.status(400).json({
                msg:"Your account was locked try to login after 10 mintes"
            })
        }
        if(user_detail[0].locking_time != null){
            let cur_date=new Date()
            let log_time=new Date(user_detail[0].locking_time)
            if(cur_date>=log_time){
                await db.update(user).set({is_locked:false,locking_time:null,login_attempt:0}).where(eq(user.profile_id,emp_id))
            }
         }
        const pass=await decrypt(password,user_detail[0].password_hash)
        if(!pass){
            await db.update(user).set({login_attempt:Number(user_detail[0].login_attempt)+1}).where(eq(user.profile_id,emp_id))
            if(user_detail[0].login_attempt+1 >= 3){
                const lock_time=new Date(user_detail[0].locking_time)
                let add_extra_time=lock_time.setMinutes(lock_time.getMinutes()+1)
                console.log(add_extra_time,lock_time," : time")
                await db.update(user).set({is_locked:true,locking_time:add_extra_time}).where(eq(user.profile_id,emp_id))
                return res.status(400).json({
                    msg:'Your account was blocked try to login after 10 mintes'
                })
            }
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
            msg:"user logined successfully"  
        })
    }catch(err){
        next(err)
    }
}

const forget_pass=async(req,res,next)=>{

}

 const my_profile=async(req,res,next)=>{
    try{
        const id = req.user
        const {emp_status}=req.query
        const result=await db.select({profile:profile,dept_name:dept.name,roles_name:roles.role_name}).from(profile)
        .innerJoin(dept,eq(dept.deptartment_id,profile.dept_id))
        .innerJoin(roles,eq(roles.role_name,emp_status))
        .innerJoin(employee_roles,and(eq(employee_roles.profile_id,id),eq(employee_roles.role_id,roles.role_id)))
        .where(eq(profile.profile_id,id))
        if(result.length==0){
            return res.status(404).json({
                msg:"user not found"
            })
        }
        res.status(200).json({
            msg:"user found",
            data:result
        })
    }catch(err){
        next(err)
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

const import_csv = async (req, res) => {
  try {
    const users = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', async () => {
        for (const u of users) {
          await db.insert(profile).values({
            profile_id: u.emp_id,
            full_name: u.full_name,
            email: u.email,
            dept_id: u.dept_id,
          });
        }

        res.status(200).json({ msg: "Users imported successfully" });
      });
  } catch (err) {
    res.status(500).json({ msg: "CSV import failed" });
  }
};

const export_csv = async (req, res) => {
  const users = await db.select().from(profile);

  let csvData = "emp_id,full_name,email,dept_id\n";
  users.forEach(u => {
    csvData += `${u.profile_id},${u.full_name},${u.email},${u.dept_id}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");
  res.send(csvData);
};
const search_employee_ids = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  const data = await db
    .select({ emp_id: profile.profile_id })
    .from(profile)
    .innerJoin(employee_roles, eq(employee_roles.profile_id, profile.profile_id))
    .innerJoin(roles, eq(roles.role_id, employee_roles.role_id))
    .where(
      sql`${profile.profile_id} ILIKE ${`%${q}%`}
       AND ${roles.role_name} = 'employee'`
    )
    .orderBy(profile.profile_id)
    .limit(10);

  res.json(data);
};

const bulk_role = async (req, res) => {
  const { emp_ids, role_name } = req.body;
  console.log(req.body);

  const role = await db
    .select()
    .from(roles)
    .where(eq(roles.role_name, role_name));

  for (const id of emp_ids) {
    await db.insert(employee_roles).values({
      profile_id: id,
      role_id: role[0].role_id,
    });
  }

  res.status(200).json({ msg: "Roles assigned successfully" });
};

const reporting_manager=async(req,res,next)=>{
    try{
        const manager=await db.select({id:valitador_config.profile_id,name:profile.username}).from(valitador_config)
        .innerJoin(profile,eq(profile.profile_id,valitador_config.profile_id))
        if(manager.length==0){
            return res.status(400).json({
                msg:'The manager details is empty add new managers'
            })
        }
        res.status(200).json({
            msg:'manager',
            data:manager
        })
    }catch(err){
        next(err)
    }
}

module.exports={signup,login,logout,my_profile,user_overview,import_csv,export_csv,bulk_role,generate_emp_id,search_employee_ids,generate_dept,add_validator,reporting_manager}

