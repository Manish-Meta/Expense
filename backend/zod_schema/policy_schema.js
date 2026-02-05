const {z}=require('zod')

const policy=z.object({
    policy_name:z.string(),
    description:z.string(),
    category:z.string(),
    currency:z.string()
})

const edit_policy=z.object({
    
})

module.exports={policy}