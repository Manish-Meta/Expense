const {varchar,numeric,timestamp,pgTable,boolean} = require("drizzle-orm/pg-core");
const {dept,priority_level}=require('../enum');
const {profile}=require('./profile')

const valitador_config = pgTable("validator_config", {
  profile_id: varchar("profile_id", { length: 20 }).references(()=>profile.profile_id,{ onDelete: "cascade" }),
  validation_scope: dept('val_scope').notNull(),
  approval_limit: numeric("approval_limit", {  
    precision: 12,
    scale: 2
  }),
  priority_level:priority_level('priority_level').notNull(),
  notify:boolean('notify').default(false),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
});
module.exports={valitador_config}