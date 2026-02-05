const {
  pgTable,
  bigserial,
  varchar,
  text,
  timestamp,
} = require("drizzle-orm/pg-core");

const { expense } = require("./expnese"); 

const policyViolations = pgTable("policy_violations", {
  violation_id: bigserial("violation_id", { mode: "number" }).primaryKey(),

  exp_id: varchar("exp_id", { length: 50 })
    .references(() => expense.exp_id, { onDelete: "cascade" }),

  rule_code: varchar("rule_code", { length: 50 }),
  message: text("message"),
  severity: varchar("severity", { length: 20 }),

  created_at: timestamp("created_at").defaultNow(),
});

module.exports = { policyViolations };
