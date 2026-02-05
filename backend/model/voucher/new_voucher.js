const {pgTable,integer,varchar,numeric,boolean,timestamp,text}=require('drizzle-orm/pg-core')
const {profile}=require('../user/profile')
const {category}=require('../expense/category')
const {exp_status,priority,compliance,expense_next_level}=require('../enum')

const new_voucher=pgTable('voucher',{
    voucher_id:varchar('voucher_id',{length:20}).primaryKey(),
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id,{onDelete:'cascade'}),
    voucher_name:varchar('voucher_name',{length:30}),
    category:varchar('category',{length:20}).references(()=>category.category_id),
    exp_size:numeric('exp_size'),
    total_amount:numeric('total_amount'),
    business_purpose:text('business_purpose'),
    status:exp_status('exp_status').notNull(),
    priority:priority('priority'),
    compliance:compliance('compliance'),
    next_level:expense_next_level('next').notNull(),
    created_at:timestamp('created_at',{mode:'date'}).defaultNow(),
    updated_at:timestamp('updated_at',{mode:'date'}).defaultNow()
})

module.exports={new_voucher}