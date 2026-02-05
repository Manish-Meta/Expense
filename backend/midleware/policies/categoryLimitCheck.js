const {db}=require('../../db/db')
const { category } = require("../../model/expense/category");
const { eq } = require("drizzle-orm");

async function categoryLimitCheck(amount,category_id) {
  const cat = await db
    .select()
    .from(category)
    .where(eq(category.category_id, category_id));
  console.log("cat:",cat)
  if (!cat.length) return null;

  if (amount > cat[0].limit) {
    console.log("catlimitcheck",amount,"limit")
    return {
      rule_code: "CATEGORY_LIMIT",
      message: `${cat[0].cat_name} limit exceeded`,
      severity: "warning",
    };
  }

  return null;
}

module.exports = categoryLimitCheck;
