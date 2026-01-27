const {db}=require('../db/db')
const {expense}=require('../model/expense/expnese')
const {category}=require('../model/expense/category')
const {expense_approve_history}=require('../model/expense/expense_approve_history')
const {advance_option}=require('../model/expense/advance_option')
const {loc}=require('../model/location')
const { eq,ne, or ,and} = require('drizzle-orm')
const {valitador_config}=require('../model/user/validator_config')
const { profile } = require('../model/user/profile')
const { employee_config } = require('../model/user/emp_config')
const {roles}=require('../model/user/role')
const {employee_roles}=require('../model/user/emp_role')
const {info}=require('../model/info')
const {payment_info}=require('../model/payment/payment')
const send_need_info=require('../utils/send_need_info')

const new_expense=async(req,res,next)=>{
    try{
        const id=req.user
        const {amount,date,merchant,category_id,business_purpose,adv_option}=req.body;
        const iamges=req.files
        // rec require condition
        // const rec_permission=await db.select({permission:category.rec_req}).from(category)
        // .where(eq(category.category_id,category_id))
        // console.log(rec_permission,category_id)
        // if(rec_permission[0].permission){
        //     if(!iamges){
        //         return res.status(400).json({
        //             msg:'In this category we need to the reciept \n without receipt you won\'t submit the expense '
        //         })
        //     }
        // }
        let result=await db.transaction(async(table)=>{

            let new_id='EXP_12121'
            let adv_id='ADV_12113'
            let loc_id='LOC_33333'
            if(adv_option){
                const {project,pay_met,locat,attendee,billable_client}=req.body;
                // insert the location values
                const loc_detail=await table.select({address:loc.location_id}).from(loc)
                if(loc_detail[loc_detail.length-1]){
                    loc_detail=loc_detail[loc_detail.length-1]?.address?.split('_')[1]
                    loc_id=`LOC_${Number(loc_detail)+1}`
                }
                const add_loc=await table.insert(loc).values({
                    location_id:loc_id,
                    state_name:locat
                })
                if(!add_loc){
                    table.rollback()
                    return res.status(400).json({
                        msg:'Enter the valid location'
                    })
                }
                // adding the advance option
                const detaill=await table.select({id:advance_option.advance_opt_id}).from(advance_option)
                if(detaill[detaill.length-1]){
                    detaill=detaill[detaill.length-1].id.split('_')[1]
                    adv_id=`ADV_${Number(detaill)+1}`
                }
                const option=await table.insert(advance_option).values({advance_opt_id:adv_id,project_name:project,payment_method:pay_met,attendees:attendee,billable_client:billable_client,location:loc_id})
            }
            const exp_detail=await table.select({id:expense.exp_id}).from(expense)
            if(exp_detail[exp_detail.length-1]){
                let uniq=exp_detail[exp_detail.length-1].id.split('_')[1]
                new_id=`EXP_${Number(uniq)+1}`
            }
            const result=await table.insert(expense).values({
                profile_id:id,
                exp_id:new_id,
                amount:amount,
                date:new Date(date),
                merchant:merchant,
                cat_id:category_id,
                business_purpose:business_purpose,
                advance_option:adv_option?adv_id:null,
                status:'Pending',
                priority:'Low',
                compliance:'Compliant',
                next_level:'Validator',
            }).returning({profile_id:expense.profile_id})
            if(!result){
                table.rollback()
                return res.status(400).json({
                    msg:'inavlid'
                })
            }
            const sta=await table.insert(expense_approve_history).values({
                profile_id:id,
                exp_id:new_id,
                status:'Submited'
            })
            if(!sta){
                table.rollback()
                return res.status(400).json({
                    msg:'inavlid'
                })
            }
            return true
        })
        if(!result){
            return res.status(400).json({
                msg:'Bad request'
            })
        }
        res.status(200).json({
            msg:'the expense added'
        })

    }catch(err){
        next(err)
    }
}

const my_exp=async(req,res,next)=>{
    try{
        const id=req.user
        const result=await db.select({expense:expense,cat_name:category.cat_name}).from(expense).where(eq(expense.profile_id,id)).innerJoin(category,eq(category.category_id,expense.cat_id))
       
        if(result.length==0){
            return res.status(200).json({
                msg:'the expenses empty'
            })
        }
        res.status(201).json({
            data:result
        })
    }catch(err){
        next(err)
    }
}

const expense_withdraw=async(req,res,next)=>{
    try{
        const {id}=req.params
        const user_id=req.user
        if(!id||!user_id){
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        const expense_detail=await db.update(expense).set({status:'Withdrawn',next_level:'Finish'}).where(eq(expense.exp_id,id))
        const expense_status=await db.insert(expense_approve_history).values({status:'Withdrawn',profile_id:user_id,exp_id:id})
        if(expense_detail.rowCount==0||expense_status.rowCount==0){
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        res.status(200).json({
            msg:'The expense withdrawed'
        })
    }catch(err){
        next(err)
    }
}

const show_particuler_expense=async(req,res,next)=>{
    try{
        const {id}=req.params
        const user_id=req.user
        console.log("id : ",id)
        await db.transaction(async(table)=>{
            const exp=await table.select({expense:expense,category:category}).from(expense)
            .innerJoin(category,eq(category.category_id,expense.cat_id))
            .where(eq(expense.exp_id,id))
            if(exp.length==0){
                return res.status(404).json({
                    msg:'The expense not found'
                })
            }
            const status=await table.select().from(expense_approve_history).where(eq(expense_approve_history.exp_id,id))
            if(!status){
                return res.status(404).json({
                    msg:'The expense not found'
                })
            }
            let adv_detail=null;
            let loc_detail=null;
            if(exp&&exp[0].advance_option){
                adv_detail=await table.select().from(advance_option).where(eq(advance_option.advance_opt_id,exp[0].advance_option))
                if(!adv_detail){
                    return 
                }
                loc_detail=await table.select().from(loc).where(eq(loc.location_id,adv_detail[0].location))
            }
            res.status(200).json({
                msg:'expense',
                
                data:{
                    exp_detail:exp,
                    status_detail:status,
                    adv_option:adv_detail,
                    loc_detail:loc_detail
                }
            })
        })
    }catch(err){
        next(err)
    }
}

const show_pending_expense=async(req,res,next)=>{
    try{
        const id=req.user
        await db.transaction(async(table)=>{
        let value=await table.select({scope:valitador_config.validation_scope}).from(valitador_config).where(eq(valitador_config.profile_id,id))
        if(!value){
            return res.status(400).json({
                msg:'invalid'
            })
        }
        console.log(value[0].scope)
        if(value[0].scope=='ALL_DEPT'){
            const all_dept=await table.select({expense:expense,cat_name:category.cat_name}).from(expense)
            .innerJoin(category,eq(expense.cat_id,category.category_id))
            .where(eq(expense.status,'Pending'),ne(expense.profile_id,id))
            if(all_dept.length==0){
                return res.status(201).json({
                    msg:'No pending expenses'
                })
            }
            return res.status(200).json({
                msg:"ALL_DEPT the all expenses are pending",
                data:all_dept
            })
        }else if(value[0].scope=='ASSIGNED_TEAMS'){
            let pending_expense=await table.select({expense:expense,cat_name:category.cat_name}).from(expense)
            .innerJoin(employee_config,and(eq(employee_config.reporting_manager,id),eq(employee_config.profile_id,expense.profile_id)))
            .innerJoin(category,eq(category.category_id,expense.cat_id))
            .where(and(ne(expense.profile_id,id),eq(expense.next_level,'Validator'),ne(expense.status,'Rejected')))
            if(!pending_expense){
                return res.status(200).json({
                    msg:'Pending expenses empty'
                })
            }
            return res.status(200).json({
                msg:"ASSIGNED_TEAMS the all expenses are pending",
                data:pending_expense
            })
        }else{
            const val_dept_id=await table.select({dept_id:profile.dept_id}).from(profile).where(eq(profile.profile_id,id))
            
            if(val_dept_id.length==0){
                return res.status(400).json({
                    msg:"Sorry,You not join any dept so i can't retreive which dept of you"
                })
            }
            const own_dept_exp=await table.select({expense:expense,cat_name:category.cat_name}).from(expense)
            .innerJoin(profile,and(eq(profile.dept_id,val_dept_id[0]?.dept_id),eq(profile.profile_id,expense.profile_id)))
            .innerJoin(category,eq(category.category_id,expense.cat_id))
            .where(and(ne(expense.profile_id,id),eq(expense.next_level,'Validator'),ne(expense.status,'Rejected')))
    
            if(own_dept_exp.length === 0){
                return res.status(200).json({
                    msg:'The pending expense is empty'
                })
            }
            return res.status(200).json({
                msg:"the all expenses are pending",
                data:own_dept_exp
            })
        }

      })
    }catch(err){
        next(err)
    }
}

const expense_validate=async(req,res,next)=>{
    try{
        const {receive_status}=req.body
        const {id}=req.params
        const user_id=req.user
        if(!id){
            return res.status(400).json({
                msg:'Invalid expense data'
            })
        }
        // const role_name=await db
        //     .select({role: roles.role_name })
        //     .from(employee_roles)
        //     .innerJoin(roles, eq(roles.role_id, employee_roles.role_id))
        //     .where(eq(employee_roles.profile_id, user_id));

        if(receive_status=='Escaleded'){
            const {remark}=req.body
            if(!remark){
                return res.status(400).json({
                    msg:'Missing the remark and why you escaleded the expense'
                })
            }
            const detail=await db.transaction(async(table)=>{
                const exp_status=await table.update(expense).set({status:'Escalated',next_level:'Admin'}).where(eq(expense.exp_id,id))
                const add_status=await table.insert(expense_approve_history).values({status:'Escalated',remark:remark,exp_id:id,profile_id:user_id})
                if(add_status.rowCount==0||exp_status.rowCount==0){
                    table.rollback()
                    return res.status(400).json({
                        msg:'Invalid'
                    })
                }
                return true
            })
            if(detail){
                return res.status(200).json({
                    msg:`The Expense ${receive_status}`
                })
            }
        }
        else if(receive_status=='Approved'){
            const detail=await db.transaction(async(table)=>{
                const exp_status=await table.update(expense).set({status:'Processing',next_level:'Admin'}).where(eq(expense.exp_id,id))
                const add_status=await table.insert(expense_approve_history).values({status:'Validated',exp_id:id,profile_id:user_id})
                if(add_status.rowCount==0||exp_status.rowCount==0){
                    table.rollback()
                    return res.status(400).json({
                        msg:'Invalid'
                    })
                }
                return true
            })
            if(detail){
                return res.status(200).json({
                    msg:`The Expense ${receive_status}`
                })
            }
        }
        else if(receive_status=='Rejected'){
            const {remark}=req.body
            if(!remark){
                return res.status(400).json({
                    msg:'Missing the remark and why you escaleded the expense'
                })
            }
            const detail=await db.transaction(async(table)=>{
                const exp_status=await table.update(expense).set({status:'Rejected',next_level:'Finish'}).where(eq(expense.exp_id,id))
                const add_status=await table.insert(expense_approve_history).values({status:'Rejected',remark:remark,exp_id:id,profile_id:user_id})
                if(add_status.rowCount==0||exp_status.rowCount==0){
                    table.rollback()
                    return res.status(400).json({
                        msg:'Invalid'
                    })
                }
                return true
            })
            if(detail){
                return res.status(200).json({
                    msg:`The Expense ${receive_status}`
                })
            }
        }
        else if(receive_status=='Needs-info'){
            const {remark}=req.body
            const detail=await db.transaction(async(table)=>{
                const exp_status=await table.update(expense).set({status:'Needs-info'}).where(eq(expense.exp_id,id)).returning({id:expense.profile_id})
                const add_status=await table.insert(expense_approve_history).values({status:'Needs-info',remark:remark,exp_id:id,profile_id:user_id})
                const result=await send_need_info(user_id,exp_status[0].id,remark,next)
                if(add_status.rowCount==0||exp_status.rowCount==0||!result){
                    table.rollback()
                    return res.status(400).json({
                        msg:'Invalid'
                    })
                }
                return true
            })
            if(detail){
                return res.status(200).json({
                    msg:`The Expense ${receive_status}`
                })
            }
        }
        else{
            return res.status(400).json({
                msg:'Invalid status'
            })
        }
    }catch(err){
        next(err)
    }
}

const show_admin_expense=async(req,res,next)=>{
    try{
        const admin_expenses=await db.select({expense:expense,cat_name:category.cat_name}).from(expense)
        .innerJoin(category,eq(expense.cat_id,category.category_id))
        .where(or(eq(expense.status,'Escalated'),eq(expense.next_level,'Admin')))
        if(admin_expenses.length==0){
            return res.status(500).json({
                msg:'The expenses is empty'
            })
        }
        res.status(200).json({
            msg:'This is pending expenses for your approval',
            data:admin_expenses
        })
    }catch(err){
        next(err)
    }
}

const admin_approve_expense=async(req,res,next)=>{
    try{
        const {status_type}=req.body
        const {id}=req.params;
        const user_id=req.user
        if(!status_type||!id||!user_id){
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        if(status_type=='approve'){
            const {payment_method,ref_num,payment_date,notes,amount}=req.body
            await db.transaction(async(table)=>{
                const payment_detail=await table.insert(payment_info).values({payment_date:new Date(payment_date),payment_method:payment_method,ref_num:ref_num,amount:amount,notes:notes,profile_id:user_id,exp_id:id})
                const add_status=await table.insert(expense_approve_history).values({status:'Paid',profile_id:user_id,exp_id:id})
                const change_status=await table.update(expense).set({status:'Paid',next_level:'Finish'}).where(eq(expense.exp_id,id))
                if(payment_detail.rowCount==0||change_status.rowCount==0||add_status.rowCount==0){
                    table.rollback()
                    return res.status(400).json({
                        msg:"Send valid details"
                    })
                }
            })
            return res.status(200).json({
                msg:`The expense ${status_type} and Paid`
            })
        }
        else if(status_type=='Reject'){
            const {remark}=req.body;
            await db.transaction(async(table)=>{
                 const change_expense_status=await table.update(expense).set({status:'Rejected',next_level:'Finish'}).where(eq(expense.exp_id,id))
                 const add_status=await table.insert(expense_approve_history).values({status:'Rejected',exp_id:id,profile_id:user_id,remark:remark})
                 if(add_status.rowCount==0||change_expense_status.rowCount==0){
                    table.rollback()
                    return res.status(400).json({
                        msg:'Invalid'
                    })
                 }
            })
            return res.status(200).json({
                msg:`The expense was ${status_type}`
            })
        }
        else if(status_type=='Needs-info'){
            const {id}=req.params;
            const user_id=req.user
            const {remark}=req.body
            if(!id||!user_id||!remark){
                return res.status(400).json({
                    msg:'some data missing'
                })
            }
            await db.transaction(async(table)=>{
                const emp_id=await table.select({id:expense.profile_id}).from(expense).where(eq(expense.exp_id,id))
                if(emp_id.length==0){
                    return res.status(404).json({
                        msg:"user not found"
                    })
                }
                const send_info=await send_need_info(user_id,emp_id[0].id,remark,next)
                if(!send_info){
                    return res.status(400).json({
                        msg:'invalid'
                    })
                }
                const change_status=await table.update(expense).set({status:'Needs-info'}).where(eq(expense.exp_id,id))
                const add_status=await table.insert(expense_approve_history).values({status:'Needs-info',exp_id:id,profile_id:user_id,remark:remark})
                if(change_status.rowCount==0||add_status.rowCount==0){
                    table.rollback()
                    return res.status(400).json({
                        msg:'something wrong'
                    })
                }
                
            })
            return res.status(200).json({
                msg:'A notification sended for need info'
            })
        }
        else{
            return res.status(400).json({
                msg:'Invalid status type'
            })
        }
    }catch(err){
        next(err)
    }
}

const need_information=async(req,res,next)=>{
    try{
        const id=req.user
        const {to_id}=req.params
        const {text}=req.body
        const images=req.files
        if(!id||!to_id){
            return res.status(500).json({
                msg:'Invalid data'
            })
        }
        const data=await db.insert(info).values({
            from:id,
            to:to_id,
            information:text
        })
    }catch(err){
        next(err)
    }
}
module.exports={new_expense,my_exp,show_particuler_expense,show_pending_expense,expense_validate,show_admin_expense,need_information,admin_approve_expense,expense_withdraw}