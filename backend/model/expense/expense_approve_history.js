const {pgTable,varchar,integer,text,timestamp,boolean,uuid}=require('drizzle-orm/pg-core')
const {expense}=require('./expnese')
const { profile } = require('../user/profile')
const { exp_status} = require('../enum')

const expense_approve_history=pgTable('expense_approve_history',{
  exp_id:varchar('exp_id',{length:20}).references(()=>expense.exp_id,{ onDelete: "cascade" }),
  profile_id:varchar('profile_id',{length:30}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
  status:exp_status('status'),
  remark:varchar('remark',{lenght:200}),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={expense_approve_history}