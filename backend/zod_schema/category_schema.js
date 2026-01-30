const {z}=require('zod')

const new_category=z.object({
    cat_name:z.string(),
    limit:z.number(),
    rec_req:z.boolean(),
    is_active:z.boolean(),
    description:z.string()
})

const exist_category=z.object({
        cat_name:z.string().optional(),
    limit:z.number().optional(),
    rec_req:z.boolean().optional(),
    is_active:z.boolean().optional(),
    description:z.string().optional()
})

module.exports={new_category,exist_category}