const {pgTable,varchar,text,integer,timestamp,boolean}=require('drizzle-orm/pg-core')
const {profile}=require('./user/profile')

const info=pgTable('info',{
    from:varchar('from',{length:20}).references(()=>profile.profile_id),
    to:varchar('to',{length:20}).references(()=>profile.profile_id),
    information:text('information'),
    attach:text('attach'),
    is_view:boolean('is_view').default(false),
    created_at:timestamp('created_at',{mode:'date'}).default(),
    updated_at:timestamp('updated_at',{mode:'date'}).default()
})

module.exports={info}