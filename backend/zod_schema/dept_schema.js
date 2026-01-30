const {z}=require('zod');

const add_dept_schema=z.object({
    dept_name:z.string()
})

module.exports={add_dept_schema}