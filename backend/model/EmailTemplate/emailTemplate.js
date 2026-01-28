import { boolean, timestamp } from "drizzle-orm/gel-core";
import { varchar } from "drizzle-orm/mysql-core";
import { pgTable } from "drizzle-orm/pg-core";

export const emailTemplate =pgTable('emailTemplate',{ 
  id: varchar("id").primaryKey(),
  profile_id:varchar("createdBy",{length:100} ),
  actionType:varchar('actionType',{length:200}),
  subject:varchar('subject', {length:700}) ,
  body:varchar('body',{length:3000}),
  isActive: boolean(),
  createdAt:timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt:timestamp("created_at", { mode: "date" }).defaultNow()
})
