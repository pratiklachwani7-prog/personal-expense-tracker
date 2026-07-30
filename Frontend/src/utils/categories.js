export const CATEGORIES = [
  { id: "food", label: "Food & Dining", color: "#d97706", icon: "UtensilsCrossed" },
  { id: "transport", label: "Transport", color: "#0891b2", icon: "Car" },
  { id: "shopping", label: "Shopping", color: "#db2777", icon: "ShoppingBag" },
  { id: "entertainment", label: "Entertainment", color: "#9333ea", icon: "Gamepad2" },
  { id: "bills", label: "Bills & Utilities", color: "#6366f1", icon: "Receipt" },
  { id: "health", label: "Health", color: "#059669", icon: "HeartPulse" },
  { id: "travel", label: "Travel", color: "#2563eb", icon: "Plane" },
  { id: "other", label: "Other", color: "#71717a", icon: "MoreHorizontal" },
]

export const getCategory = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
