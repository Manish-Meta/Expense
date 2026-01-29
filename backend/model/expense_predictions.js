const { pgTable, text, varchar, integer, timestamp, uuid } = require("drizzle-orm/pg-core")

module.exports = pgTable("expense_predictions", {
  prediction_id: uuid("prediction_id").defaultRandom().primaryKey(),

  type: varchar("type", { length: 50 }).notNull(),

  title: text("title").notNull(),
  description: text("description").notNull(),

  confidence: integer("confidence"),

  impact: varchar("impact", { length: 20 }),

  recommendation: text("recommendation").notNull(),

  horizon: varchar("horizon", { length: 50 }),

  created_at: timestamp("created_at").defaultNow()
})
