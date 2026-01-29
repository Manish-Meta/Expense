const {z}=require('zod')

const new_category=z.object({
    cat_name:z.string(),
    limit:z.number(),
    rec_req:z.boolean(),
    is_active:z.boolean(),
    description:z.string()
})

