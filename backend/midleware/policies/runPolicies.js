const categoryLimitCheck = require("./categoryLimitCheck")

async function runPolicies(amount,category_id) {
  const violations = [];
  const d = ms => new Promise(res => setTimeout(res, ms));

  const v = await categoryLimitCheck(amount,category_id);
  console.log(v)
  if (v) {
    violations.push(v);

  }
  else{

  }
    
  await d(2000)
  return violations;
}

module.exports = runPolicies;
