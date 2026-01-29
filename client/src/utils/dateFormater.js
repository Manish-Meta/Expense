export const formatDateTime = (date) => {
  if (!date) return "-"
  const d = new Date(date)
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}