const {varchar,bigserial,timestamp,pgTable,primaryKey} = require("drizzle-orm/pg-core");
const {profile}=require('./profile')
const {roles}=require('./role')

const employee_roles = pgTable("employee_roles",{
    profile_id: varchar("profile_id", { length: 50 }).notNull().references(()=>profile.profile_id,{ onDelete: "cascade" }),
    role_id: varchar("role_id",{length:20}).notNull().references(()=>roles.role_id,{ onDelete: "cascade" }),
    assigned_at: timestamp("assigned_at", {
      mode: "date",
    }).defaultNow(),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
  }
);

module.exports = { employee_roles };
