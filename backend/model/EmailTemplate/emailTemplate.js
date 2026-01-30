const { pgTable,boolean,timestamp,varchar } =require("drizzle-orm/pg-core");
 
const emailtemplate =pgTable('emailtemplate',{
  id: varchar("id").primaryKey(),
  profile_id:varchar("createdBy",{length:100} ),
  actionType:varchar('actionType',{length:200}),
  subject:varchar('subject', {length:700}) ,
  body:varchar('body',{length:3000}),
  isActive: boolean('isActive'),
  createdAt:timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt:timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={emailtemplate}