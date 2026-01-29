const axios = require("axios");

const AI_BASE = "http://localhost:8001";

async function getPredictions(userId) {
  const res = await axios.get(`${AI_BASE}/predict/all/${userId}`);
  return res.data;
}

module.exports = { getPredictions };
