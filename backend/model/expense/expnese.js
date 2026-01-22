const {pgTable,integer,text,varchar,uuid,timestamp,numeric,jsonb,boolean}=require('drizzle-orm/pg-core')
const {profile}=require('../user/profile')
const {category}=require('./category')
const {exp_status,compliance,priority,user_role_enum}=require('../enum')
const {advance_option}=require('./advance_option')

const expense=pgTable('expense',{
    exp_id:varchar('exp_id',{length:20}).primaryKey(),
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
    amount:numeric('amount').notNull(),
    date:timestamp('date',{mode:'date'}),
    merchant:varchar('vendor',{length:25}),
    business_purpose:text('business_purpose'),
    cat_id:varchar('category_id',{lenght:20}).references(()=>category.category_id,{ onDelete: "cascade" }),
    advance_option:varchar('advance_option',{lenght:20}).references(()=>advance_option.advance_opt_id,{ onDelete: "cascade" }),
    reciept:text('reciept'),
    status:exp_status('exp_status').notNull(),
    priority:priority('priority'),
    compliance:compliance('compliance'),
    next_level:user_role_enum('next').notNull(),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={expense}