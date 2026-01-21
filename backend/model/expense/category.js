const {pgTable,integer,text,varchar,numeric,boolean,timestamp}=require('drizzle-orm/pg-core')
const { profile } = require('../user/profile')

const category=pgTable('category',{
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id),
    category_id:varchar('category_id',{lenght:20}).primaryKey(),
    description:text('description'),
    cat_name:varchar('cat_name',{length:50}).notNull().unique(),
    limit:integer('limit'),
    rec_req:boolean('rec_req'),
    is_active:boolean('is_active').default(false),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={category}