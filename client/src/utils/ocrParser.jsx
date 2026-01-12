
export function parseReceipt(text) {
  if (!text) return { merchant: "", amount: "", date: "" }

  const cleanText = text.replace(/[^\x20-\x7E\n]/g, "")

  const lines = cleanText
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const merchant =
    lines.find(l => /[A-Za-z]/.test(l) && l.length > 5) || ""

  let date = ""

  const dateRegex =
    /\b(\d{2})\s*[\/\-]\s*(\d{2})\s*[\/\-]\s*(\d{4})\b/

  function convertToIndianDate(a, b, y) {
    const first = Number(a)
    const second = Number(b)

   
    if (first <= 12) {
      return `${b}/${a}/${y}` 
    }

  
    return `${a}/${b}/${y}`
  }

  for (const line of lines) {
    const lower = line.toLowerCase()

    if (lower.includes("bill date") || lower.startsWith("date")) {
      const match = line.match(dateRegex)
      if (match) {
        const [, a, b, y] = match
        date = convertToIndianDate(a, b, y)
        break
      }
    }
  }

  if (!date) {
    const fallback = cleanText.match(dateRegex)
    if (fallback) {
      const [, a, b, y] = fallback
      date = convertToIndianDate(a, b, y)
    }
  }


  let amount = ""

  const totalLine = lines.find(l => /total/i.test(l))
  if (totalLine) {
    const amtMatch = totalLine.match(/\d+(?:\.\d{2})?/)
    if (amtMatch) amount = amtMatch[0]
  }

  if (!amount) {
    const numbers = cleanText.match(/\d+(?:\.\d{2})?/g) || []
    const valid = numbers
      .map(Number)
      .filter(n => n > 1 && n < 100000)

    if (valid.length) amount = Math.max(...valid).toFixed(2)
  }

  return {
    merchant,
    amount,
    date,
  }
}

