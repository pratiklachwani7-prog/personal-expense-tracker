export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0)

export const formatDate = (dateStr) => {
  if (!dateStr) return "—"
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const formatDateInput = (dateStr) => {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  return d.toISOString().split("T")[0]
}

export const getMonthLabel = () =>
  new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })
