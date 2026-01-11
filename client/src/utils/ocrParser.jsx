export function parseReceipt(text) {
  if (!text) return { merchant: "", amount: "", date: "" }

  const cleanText = text.replace(/[^\x20-\x7E\n]/g, "")

  const lines = cleanText
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 2)
  const merchant =
    lines.find(l => /[A-Za-z]/.test(l)) || ""

  let amount = ""

  const totalLine = lines.find(l =>
    /total/i.test(l)
  )

  if (totalLine) {
    const match = totalLine.match(/\d+(?:\.\d{2})?/)
    if (match) amount = match[0]
  }

  if (!amount) {
    const numbers = cleanText.match(/\d+(?:\.\d{2})?/g) || []
    const valid = numbers
      .map(n => Number(n))
      .filter(n => n > 1 && n < 100000)

    amount = valid.length ? Math.max(...valid).toFixed(2) : ""
  }

  const dateMatch =
    cleanText.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/) ||
    cleanText.match(/\d{4}[\/\-]\d{2}[\/\-]\d{2}/)

  const date = dateMatch ? dateMatch[0] : ""

  return {
    merchant,
    amount,
    date,
  }
}
