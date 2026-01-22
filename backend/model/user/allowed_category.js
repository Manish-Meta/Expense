const {pgTable,integer,numeric,varchar,text,timestamp}=require('drizzle-orm/pg-core')
const {profile}=require('./profile')

const allow_category=pgTable('allow_category',{
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
    category:varchar('category',{length:30}),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()  
})

module.exports={allow_category}