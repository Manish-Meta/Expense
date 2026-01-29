const axios = require("axios");
const { db } = require("../db/db");
const { expense_predictions } = require("../model/expense_predictions");

async function runAIPipeline() {
  const analyticsRes = await axios.get(
    "http://localhost:3000/analytics/expense-summary",
    { withCredentials: true }
  );

  const analytics = analyticsRes.data;

  const aiRes = await axios.post(
    "http://localhost:8001/predict",
    analytics
  );

  const predictions = aiRes.data.predictions;

  for (const p of predictions) {
    await db.insert(expense_predictions).values({
      type: p.type,
      title: p.title,
      description: p.description,
      confidence: p.confidence,
      impact: p.impact,
      recommendation: p.recommendation,
      horizon: p.horizon,
    });
  }
}

module.exports = { runAIPipeline };
