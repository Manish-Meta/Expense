const {integer,numeric,text,timestamp,varchar,pgTable}=require('drizzle-orm/pg-core')
const {pay_met}=require('../enum')
const {profile}=require('../user/profile')
const {expense}=require('../expense/expnese')

const payment_info=pgTable('payment_info',{
    exp_id:varchar('exp_id',{length:20}).references(()=>expense.exp_id,{ onDelete: "cascade" }),
    payment_method:pay_met('payment_method'),
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
    amount:numeric('amount'),
    payment_date:timestamp('payment_date'),
    ref_num:varchar('ref_num',{length:50}).unique(),
    receipt:text('receipt'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.export={payment_info}