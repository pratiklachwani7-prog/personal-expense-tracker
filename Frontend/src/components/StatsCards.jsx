import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  CalendarDays,
  IndianRupee,
  Layers,
  TrendingUp,
} from "lucide-react"
import { memo, useRef } from "react"
import { formatCurrency, getMonthLabel } from "../utils/formatters"
import { StatCardSkeleton } from "./Skeleton"

gsap.registerPlugin(ScrollTrigger)

const STAT_CONFIG = [
  { key: "total", label: "Total spent", icon: IndianRupee },
  { key: "monthly", label: "This month", icon: CalendarDays, showMonth: true },
  { key: "today", label: "Today", icon: TrendingUp },
  { key: "count", label: "Transactions", icon: Layers, isCount: true },
]

const StatsCards = ({ stats, loading }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (loading) return

      gsap.from(".stat-card", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
        },
      })

      containerRef.current?.querySelectorAll(".stat-value").forEach((el) => {
        const target = parseFloat(el.dataset.value) || 0
        const isCurrency = el.dataset.currency === "true"
        const obj = { val: 0 }

        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = isCurrency
              ? formatCurrency(Math.round(obj.val))
              : Math.round(obj.val).toLocaleString("en-IN")
          },
        })
      })
    },
    { scope: containerRef, dependencies: [stats, loading] }
  )

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const values = {
    total: stats.total,
    monthly: stats.monthly,
    today: stats.today,
    count: stats.count,
  }

  return (
    <div
      ref={containerRef}
      className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
      role="list"
      aria-label="Expense statistics"
    >
      {STAT_CONFIG.map(({ key, label, icon: Icon, showMonth, isCount }) => (
        <article
          key={key}
          className="stat-card glass-card"
          role="listitem"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="icon-box" aria-hidden="true">
              <Icon size={18} strokeWidth={1.75} />
            </div>
            {showMonth && (
              <span className="text-caption">{getMonthLabel()}</span>
            )}
          </div>
          <p className="text-caption mb-1">{label}</p>
          <p
            className="stat-value ticker-number"
            data-value={values[key]}
            data-currency={!isCount}
          >
            {isCount ? "0" : formatCurrency(0)}
          </p>
        </article>
      ))}
    </div>
  )
}

export default memo(StatsCards)
