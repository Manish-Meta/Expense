const { pgTable, varchar, boolean, integer,jsonb } = require("drizzle-orm/pg-core");
const { expense_form } = require("./expense_form");
const { category } = require("./category");

const expense_form_fields = pgTable("expense_form_fields", {
  field_id: varchar("field_id", { length: 30 }).primaryKey(),

  form_id: varchar("form_id", { length: 30 })
    .references(() => expense_form.form_id, { onDelete: "cascade" }),

  category_id: varchar("category_id", { length: 20 })
    .references(() => category.category_id, { onDelete: "cascade" }),

  field_name: varchar("field_name", { length: 50 }),
  field_key: varchar("field_key", { length: 50 }),
  field_type: varchar("field_type", { length: 20 }),
  required: boolean("required"),
  visible_to: jsonb("visible_to").default(["employee"]),
  editable_by: jsonb("editable_by").default(["employee"]),
  editable: boolean("editable"),
  order_index: integer("order_index"),

  is_active: boolean("is_active").default(true),
});

module.exports = { expense_form_fields };
