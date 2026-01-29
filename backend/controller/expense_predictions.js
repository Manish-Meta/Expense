const { db } = require("../db/db");
const expensePredictions = require("../model/expense_predictions");

const getPredictions = async (req, res, next) => {
  try {
    const data = await db.select().from(expensePredictions).orderBy(
      expensePredictions.created_at
    );

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

const savePrediction = async (req, res, next) => {
  try {
    const result = await db.insert(expensePredictions).values(req.body);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPredictions,
  savePrediction
};
