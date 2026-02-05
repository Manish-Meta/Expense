const { db } = require("../db/db");
const { policyViolations } = require("../model/expense/policyViolations");
const {expense} = require("../model/expense/expnese");
const { eq } = require("drizzle-orm");

async function saveViolations(exp_id, violations) {
    // console.log("save",exp_id,violations)
  if (!violations.length) return;

  await db.insert(policyViolations).values(
    violations.map(v => ({
      exp_id,
      rule_code: v.rule_code,
      message: v.message,
      severity: v.severity,
    }))
  );
  const complianceStatus =
  violations.length > 0 ? "Violation Found" : "Compliant";
  console.log(complianceStatus,violations)

   const updateExp =  await db
    .update(expense)
    .set({
        compliance: complianceStatus,
        updated_at: new Date(),
    })
    .where(eq(expense.exp_id, exp_id));
    console.log("updated",updateExp)
}

module.exports = saveViolations;
