const express = require("express");
const router = express.Router();
const { savePrediction } = require("../controller/expense_predictions");
const { token_decode } = require("../midleware/jwt");

router.post("/run", token_decode, savePrediction);

module.exports = router;
