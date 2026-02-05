const {db}=require('../../db/db')
const {new_voucher}=require('../../model/voucher/new_voucher')
const {expense}=require('../../model/expense/expnese')
const {expense_approve_history}=require('../../model/expense/expense_approve_history')
const {eq,and}=require('drizzle-orm')

const show_exp_vou=async(table,id,status,remark=null,user_id,next)=>{
    // find the id type expense or voucher
    let id_table=id.startsWith('V');
    let exp_table=id_table?new_voucher:expense
    let exp_table_id=id_table?new_voucher.voucher_id:expense.exp_id
    let exp_his_data=id_table?{status:status,remark:remark,voucher_id:id,profile_id:user_id}:{status:status,remark:remark,exp_id:id,profile_id:user_id}
    let expense_history=id_table?expense_approve_history.voucher_id:expense_approve_history.exp_id

    const detail=await table.select().from(exp_table).where(eq(exp_table_id,id))
    if(status != 'Need-info'){
        const exp_data=await table.select().from(expense_approve_history).where(and(and(eq(expense_history,id),eq(expense_approve_history.status,status)),eq(expense_approve_history.profile_id,user_id)))
        if(exp_data.length!=0){
            return 'exist'
        }
    }
    if(detail.length==0){
        return false
    }
    const exp_status=await table.update(exp_table).set({status:status,next_level:next}).where(eq(exp_table_id,id))
    const add_status=await table.insert(expense_approve_history).values(exp_his_data)

    return {exp_status,add_status}
}

module.exports={show_exp_vou}