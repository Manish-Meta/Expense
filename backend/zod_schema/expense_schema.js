const { text } = require('drizzle-orm/gel-core')
const {z}=require('zod')

const check_new_expense=z.object({
    amount:z.number(),
    date:z.string(),
    merchant:z.string(),
    category_id:z.string(),
    business_purpose:z.string(),
    adv_option:z.boolean().optional().default(false)
})

const check_advance_option=z.object({
    project:z.string(),
    pay_met:z.string(),
    locat:z.string(),
    attendee:z.string(),
    billable_client:z.boolean()
})

const ckeck_recieve_exp_status=z.object({
    receive_status:z.string(),
    remark:z.string().optional()
})

const admin_send_status=z.object({
    status_type:z.string(),
    remark:z.string()
})

const exp_needs_info=z.object({
    text:z.string()
})
module.exports={check_new_expense,check_advance_option,ckeck_recieve_exp_status,admin_send_status,exp_needs_info}