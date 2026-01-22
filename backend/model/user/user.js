const {
  bigserial,varchar,text,boolean,timestamp,pgTable,uuid} = require("drizzle-orm/pg-core");
  const {profile}=require('./profile');
const { numeric } = require("drizzle-orm/pg-core");

const user = pgTable("user_detail", {
  user_id:varchar('user_id',{length:20}),
  profile_id: varchar("profile_id", { length: 50 }).notNull().unique().references(()=>profile.profile_id,{ onDelete: "cascade" }),
  password_hash: text("password_hash").notNull(),
  is_locked: boolean("is_locked").default(false),
  locking_time:numeric('locking_time'),
  login_attempt:numeric('login_attempt').default(0),
  last_password_change: timestamp("last_password_change", {
    mode: "date"
  }).defaultNow(),
  created_at: timestamp("created_at", {
   mode:'date'
  }).defaultNow(),
});

module.exports = { user};
