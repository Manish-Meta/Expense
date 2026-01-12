export function toISODate(ddmmyyyy) {
  if (!ddmmyyyy) return ""

  const [dd, mm, yyyy] = ddmmyyyy.split("/")
  return `${yyyy}-${mm}-${dd}`
}

export function fromISODate(iso) {
  if (!iso) return ""

  const [yyyy, mm, dd] = iso.split("-")
  return `${dd}/${mm}/${yyyy}`
}
