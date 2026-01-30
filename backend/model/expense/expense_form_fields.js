const {
  pgTable,
  varchar,
  boolean,
  integer,
  json,
  timestamp
} = require("drizzle-orm/pg-core");

const { category } = require("./category");

const expense_form_fields = pgTable("expense_form_fields", {
  field_id: varchar("field_id", { length: 30 }).primaryKey(),

  category_id: varchar("category_id", { length: 20 })
    .references(() => category.category_id, { onDelete: "cascade" }),

  field_name: varchar("field_name", { length: 50 }).notNull(),
  field_key: varchar("field_key", { length: 50 }).notNull(),

  field_type: varchar("field_type", { length: 20 }).notNull(),

  required: boolean("required").default(false),
  editable: boolean("editable").default(true),
  encrypted: boolean("encrypted").default(false),

  min_length: integer("min_length"),
  max_length: integer("max_length"),

  options: json("options"), 

  order_index: integer("order_index").default(0),

  is_active: boolean("is_active").default(true),

  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
});

module.exports = { expense_form_fields };
