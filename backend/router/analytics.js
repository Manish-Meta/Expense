const express = require("express");
const router = express.Router();

const { getPredictions } = require("../controller/expense_predictions");

router.get("/predictions", getPredictions);

module.exports = router;
