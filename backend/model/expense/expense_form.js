const { pgTable, varchar } = require("drizzle-orm/pg-core");

const expense_form = pgTable("expense_form", {
  form_id: varchar("form_id", { length: 30 }).primaryKey(),
  form_name: varchar("form_name", { length: 50 }),
  module: varchar("module", { length: 30 }) 
});

module.exports = { expense_form };
