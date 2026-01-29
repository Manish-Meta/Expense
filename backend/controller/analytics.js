const { db } = require("../db/db");
const expensePredictions = require("../model/expense_predictions");

const getPredictions = async (req, res, next) => {
  try {
    const data = await db
      .select()
      .from(expensePredictions)
      .orderBy(expensePredictions.created_at);

    res.json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPredictions };
