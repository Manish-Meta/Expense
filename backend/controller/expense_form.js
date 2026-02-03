const { db } = require("../db/db");
const { expense_form } = require("../model/expense/expense_form");

const getExpenseForms = async (req, res) => {
  const forms = await db.select().from(expense_form);
  res.json({ data: forms });
};
module.exports={getExpenseForms};
