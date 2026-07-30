import { motion } from "framer-motion"
import { PieChart as PieChartIcon } from "lucide-react"
import { memo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { getCategory } from "../utils/categories"
import { formatCurrency } from "../utils/formatters"
import { ChartSkeleton } from "./Skeleton"

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value, payload: item } = payload[0]
  return (
    <div className="glass-card px-4 py-3 text-sm border border-[var(--border-default)] shadow-lg">
      <p className="text-[var(--text-primary)] font-medium">{name}</p>
      <p className="ticker-number text-base font-semibold mt-0.5">
        {formatCurrency(value)}
      </p>
      <p className="text-caption mt-0.5">{item.percentage}% of total</p>
    </div>
  )
}

const ExpenseChart = ({ expenses, loading }) => {
  if (loading) return <ChartSkeleton />

  const categoryTotals = expenses.reduce((acc, exp) => {
    const cat = exp.category || "other"
    acc[cat] = (acc[cat] || 0) + Number(exp.amount)
    return acc
  }, {})

  const total = Object.values(categoryTotals).reduce((s, v) => s + v, 0)

  const chartData = Object.entries(categoryTotals)
    .map(([id, value]) => {
      const cat = getCategory(id)
      return {
        id,
        name: cat.label,
        value,
        color: cat.color,
        percentage: total ? Math.round((value / total) * 100) : 0,
      }
    })
    .sort((a, b) => b.value - a.value)

  if (!chartData.length) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[320px] text-center">
        <div className="icon-box w-12 h-12 mb-4">
          <PieChartIcon size={20} strokeWidth={1.75} />
        </div>
        <p className="text-h2 mb-1">No spending data</p>
        <p className="text-caption">Add expenses to see category breakdown</p>
      </div>
    )
  }

  return (
    <motion.div
      className="glass-card p-6 h-full"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-h2 font-heading mb-1">By category</h3>
      <p className="text-caption mb-6">Where your money goes</p>

      <div className="flex flex-col gap-6">
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={88}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="space-y-3" aria-label="Category breakdown">
          {chartData.map((item, i) => (
            <motion.li
              key={item.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: item.color }}
                aria-hidden="true"
              />
              <span className="text-sm text-[var(--text-secondary)] flex-1 truncate">
                {item.name}
              </span>
              <span className="text-sm ticker-number text-[var(--text-primary)]">
                {formatCurrency(item.value)}
              </span>
              <span className="text-caption w-8 text-right tabular-nums">
                {item.percentage}%
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default memo(ExpenseChart)
