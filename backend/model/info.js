const {pgTable,varchar,text,integer,timestamp,boolean}=require('drizzle-orm/pg-core')
const {profile}=require('./user/profile')
const {expense} = require('./expense/expnese')
const info=pgTable('info',{
    from:varchar('from',{length:20}).references(()=>profile.profile_id),
    to:varchar('to',{length:20}).references(()=>profile.profile_id),
    information:text('information'),
    attach:text('attach'),
    is_view:boolean('is_view').default(false),
    exp_id:varchar('exp_id',{length:20}).references(()=>expense.exp_id,{ onDelete: "cascade" }),
    created_at:timestamp('created_at',{mode:'date'}).defaultNow(),
    updated_at:timestamp('updated_at',{mode:'date'}).defaultNow()
})

module.exports={info}