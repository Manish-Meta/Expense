const { number } = require('zod')
const {db}=require('../db/db')
const {new_voucher}=require('../model/voucher/new_voucher')
const {voucher_expense}=require('../model/voucher/voucher_expense')
const {voucher_schema}=require('../zod_schema/voucher')
const {category}=require('../model/expense/category')
const {employee_config}=require('../model/user/emp_config')
const {advance_option}=require('../model/expense/advance_option')
const {loc}=require('../model/location')
const {eq}=require('drizzle-orm')
const {expense_approve_history}=require('../model/expense/expense_approve_history')

const add_voucher=async(req,res,next)=>{
    try{
        const is_check_req=voucher_schema.safeParse(req.body)
        if(!is_check_req.success){
            res.status(400).json({
                msg:'Invalid format'
            })
            return
        }
        const id=req.user
        const {voucher_name,category_id,business_purpose,exp_list}=is_check_req.data
        if(!voucher_name||!category||exp_list.length==0||!id){
            res.status(400).json({
                msg:'data missing'
            })
            return
        }

        // generate voucher and expense id
        let new_voucher_id='VOU_111111'
        let new_exp_id=111111

        const voucher_data=await db.select().from(new_voucher)
        const expense_data=await db.select().from(voucher_expense)

        if(voucher_data[voucher_data.length-1]){
            let vouchers=voucher_data[voucher_data.length-1].voucher_id.split('_')[1]
            new_voucher_id=`VOU_${number(vouchers)+1}`
        }

        let total_amount=0
        // add the voucher and expense
        console.log("transaction")
        let result=await db.transaction(async(table)=>{
            let emergency=null
            
            const voucher_detail=await table.insert(new_voucher).values({
                voucher_id:new_voucher_id,
                profile_id:id,
                voucher_name:voucher_name,
                business_purpose:business_purpose,
                category:category_id,
                status:'Submited',
                next_level:'Validator',
                exp_size:exp_list.length,
                priority:emergency==null?'Low':emergency?'High':'Medium'
            })
            if(voucher_detail.rowCount==0){
                res.status(400).json({
                    msg:'Invalid voucher'
                })
                return
            }
            if(expense_data[expense_data.length-1]){
                    let expenses=expense_data[expense_data.length-1].exp_id.split('_')[2]
                    new_exp_id=Number(expenses)
            }
            let is_compliant=false
            for(let exp of exp_list){
                total_amount+=exp.amount
                let compilant=['alcohol']
                let check=exp.business_purpose.split(' ')
                let value=check.includes(compilant.map(data=>data.toLowerCase()))
                let user_detail=await table.select().from(category).where(eq(category.category_id,category_id))
                if(user_detail[0].limit<exp.amount){
                    is_compliant=true
                }
                let add_expense=await table.insert(voucher_expense).values({
                            voucher_id:new_voucher_id,
                            exp_id:`VOU_EXP_${new_exp_id}`,
                            amount:exp.amount,
                            date:new Date(exp.date),
                            merchant:exp.merchant,
                            business_purpose:exp.business_purpose,
                            cat_id:exp.cat_id,
                            compliance:is_compliant?'Warning':'Compliant'
                })
                if(add_expense.rowCount==0){
                    table.rollback()
                    res.status(400).json({
                        msg:'you can\'t add voucher'
                    })
                    return
                }
                new_exp_id+=1
            }
            let update_id=await table.update(new_voucher).set({total_amount:total_amount,compliance:is_compliant?'Warning':'Compliant'}).where(eq(new_voucher.voucher_id,new_voucher_id))
            await table.insert(expense_approve_history).values({status:'Submited',voucher_id:new_voucher_id,profile_id:id})
            if(update_id.rowCount==0){
                table.rollback()
                res.status(400).json({
                    msg:'invalid'
                })
                return
            }
            return true
        })
        if(!result){
            res.status(200).json({
            msg:'throwing error'
        })
        }
        res.status(200).json({
            msg:'voucher submided'
        })
    }catch(err){
        next(err)
    }
}

module.exports={add_voucher}