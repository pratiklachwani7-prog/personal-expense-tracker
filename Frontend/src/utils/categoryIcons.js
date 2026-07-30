import {
  Car,
  Gamepad2,
  HeartPulse,
  MoreHorizontal,
  Plane,
  Receipt,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react"

export const CATEGORY_ICONS = {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Gamepad2,
  Receipt,
  HeartPulse,
  Plane,
  MoreHorizontal,
}

export const getCategoryIcon = (iconName) =>
  CATEGORY_ICONS[iconName] || MoreHorizontal
