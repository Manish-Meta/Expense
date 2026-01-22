const {varchar,numeric,timestamp,pgTable} = require("drizzle-orm/pg-core");
const {profile}=require('./profile');

const employee_config = pgTable("employee_config", {
  profile_id: varchar("profile_id", { length: 20 }).references(()=>profile.profile_id,{ onDelete: "cascade" }),
  reporting_manager:varchar('reporting_manager',{length:20}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
  monthly_limit: numeric("monthly_limit"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

module.exports={employee_config}
