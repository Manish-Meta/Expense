export function validateExpense(amount, category) {
  if (!category.limit) {
    return { valid: true }
  }

  if (amount > category.limit) {
    return {
      valid: false,
      message: `Amount exceeds ${category.currency}${category.limit}} limit`,
    }
  }

  return { valid: true }
}
