const {pgTable,varchar,integer,text,timestamp}=require('drizzle-orm/pg-core')
const {profile}=require('./user/profile')

const feedback=pgTable('feedback',{
    feedback_id:varchar('feedback_id',{length:10}).primaryKey(),
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
    rating:integer('rating').notNull(),
    cmd:text('cmd'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={feedback}