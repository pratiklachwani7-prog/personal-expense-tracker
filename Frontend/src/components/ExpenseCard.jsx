import { motion } from "framer-motion"
import { ExternalLink, Pencil, Trash2 } from "lucide-react"
import { memo } from "react"
import { getCategory } from "../utils/categories"
import { getCategoryIcon } from "../utils/categoryIcons"
import { formatCurrency, formatDate } from "../utils/formatters"

const ExpenseCard = ({ expense, index, onEdit, onDelete }) => {
  const cat = getCategory(expense.category)
  const Icon = getCategoryIcon(cat.icon)

  return (
    <motion.article
      className="expense-card group"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ delay: Math.min(index * 0.03, 0.15), duration: 0.3 }}
      layout
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-60"
        style={{ background: cat.color }}
        aria-hidden="true"
      />

      <div className="flex gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[var(--border-subtle)]"
          style={{ background: `${cat.color}12`, color: cat.color }}
          aria-hidden="true"
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">
                {expense.description}
              </h4>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span
                  className="category-badge"
                  style={{ background: `${cat.color}18`, color: cat.color }}
                >
                  {cat.label}
                </span>
                <time className="text-caption" dateTime={expense.date}>
                  {formatDate(expense.date)}
                </time>
              </div>
            </div>
            <p className="ticker-number text-base font-semibold text-[var(--text-primary)] shrink-0">
              {formatCurrency(expense.amount)}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {expense.bill && (
              <a
                href={expense.bill}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={14} strokeWidth={1.75} />
                Receipt
              </a>
            )}
            <button
              type="button"
              className="btn-ghost ml-auto"
              onClick={() => onEdit(expense)}
              aria-label={`Edit ${expense.description}`}
            >
              <Pencil size={14} strokeWidth={1.75} />
              Edit
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => onDelete(expense)}
              aria-label={`Delete ${expense.description}`}
            >
              <Trash2 size={14} strokeWidth={1.75} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(ExpenseCard)
