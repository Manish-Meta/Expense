const cron = require("node-cron");
const { runAIPipeline } = require("../services/aiPipeline");
cron.schedule("0 2 * * *", async () => {
  console.log("Running AI prediction pipeline...");
  try {
    await runAIPipeline();
    console.log("AI predictions completed");
  } catch (err) {
    console.error("AI pipeline failed", err);
  }
});
