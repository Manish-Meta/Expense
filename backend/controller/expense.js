const {db}=require('../db/db')
const {expense}=require('../model/expense/expnese')
const {category}=require('../model/expense/category')
const {expense_approve_history}=require('../model/expense/expense_approve_history')
const {advance_option}=require('../model/expense/advance_option')
const {loc}=require('../model/location')
const { eq,ne } = require('drizzle-orm')
const {valitador_config}=require('../model/user/validator_config')

const new_expense=async(req,res)=>{
    try{
        const id=req.user
        const {amount,date,merchant,category_id,business_purpose,adv_option}=req.body;

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
        console.log(err)
        res.status(500).json({
            msg:"internal server error"
        })
    }
}

const my_exp=async(req,res)=>{
    try{
        const id=req.user
        const result=await db.select({expense:expense,cat_name:category.cat_name}).from(expense).where(eq(expense.profile_id,id)).innerJoin(category,eq(category.category_id,expense.cat_id))
        if(!result){
            return res.status(200).json({
                msg:'the expenses empty'
            })
        }
        res.status(201).json({
            data:result
        })
    }catch(err){
        res.status(500).json({
            msg:'internal server error'
        })
    }
}

const show_particuler_expense=async(req,res)=>{
    try{
        const {id}=req.params
        await db.transaction(async(table)=>{
            const exp=await table.select({expense:expense,category:category}).from(expense)
            .innerJoin(category,eq(category.category_id,expense.cat_id,))
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
        console.log(err)
        res.status(500).json({
            msg:'internal server error'
        })
    }
}

const show_pending_expense=async(req,res)=>{
    const id=req.user
    await db.transaction(async(table)=>{
        let value=await table.select({scope:valitador_config.validation_scope}).from(valitador_config)
        if(!value){
            return res.status(400).json({
                msg:'invalid'
            })
        }
        console.log(value[0].scope)
        if(value[0].scope=='ALL_DEPT'){
            const all_dept=await table.select().from(expense).where(eq(expense.status,'Pending'),ne(expense.profile_id,id))
            if(all_dept.length==0){
                return res.status(201).json({
                    msg:'No pending expenses'
                })
            }
            return res.status(200).json({
                msg:"the all expenses are pending"
            })
        }else if(value[0].scope=='ASSIGNED_TEAMS'){
            const teams=''
        }

    })
}

module.exports={new_expense,my_exp,show_particuler_expense}