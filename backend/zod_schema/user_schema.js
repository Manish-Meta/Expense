const { min } = require('drizzle-orm');
const {z}=require('zod');

const signup_user=z.object({
    emp_id:z.string(),
    email:z.string(),
    dept_id:z.string(),
    full_name:z.string(),
    emp_status:z.string(),
    welcome_email:z.boolean()
})

const signup_emp=z.object({
    reporting_manager:z.string(),
    expense_limit:z.number(),
    allow_cat:z.array(z.string()),
    password:z.string().optional()
})

const add_validator=z.object({
    validator_scope:z.string(),
    approve_limit:z.number(),
    priority_level:z.string(),
    notify:z.boolean()
})

const user_enum=z.enum(['employee','validator','admin','vendor'])

const user_login=z.object({
    emp_id:z.string(),
    password:z.number().min(5),
    emp_status:user_enum
})

const user_id=z.object({
    id:z.string()
})


module.exports={signup_user,signup_emp,add_validator,user_login,user_id}
