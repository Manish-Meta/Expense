const express = require("express");
const router = express.Router();
const {
  savePrediction
} = require("../controller/prediction_controller");

router.post("/save", savePrediction);

module.exports = router;
