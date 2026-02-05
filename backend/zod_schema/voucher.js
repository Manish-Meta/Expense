const {z}=require('zod');

const expense_list=z.object({
        amount:z.number(),
        date:z.string(),
        merchant:z.string(),
        business_purpose:z.string(),
        cat_id:z.string(),
        advance_option:z.boolean().optional(),
})

const voucher_schema=z.object({
    voucher_name:z.string(),
    category_id:z.string(),
    business_purpose:z.string(),
    exp_list:z.array(expense_list)
})

module.exports={voucher_schema}