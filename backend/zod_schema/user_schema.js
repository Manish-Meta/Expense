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

const new_validator=z.object({
    emp_id:z.string(),
    validator_scope:z.string(),
    approve_limit:z.number(),
    priority_level:z.string(),
    notify:z.boolean(),
    emp_status:z.string()
})

const user_enum=z.enum(['employee','validator','admin','vendor'])

const user_login=z.object({
    emp_id:z.string(),
    password:z.string(),
    emp_status:user_enum
})

const user_id=z.object({
    id:z.string()
})

const login_schema=z.object({
    emp_id:z.string(),
    password:z.string(),
    emp_status:z.string()
})

module.exports={signup_user,signup_emp,user_login,user_id,new_validator,login_schema}
