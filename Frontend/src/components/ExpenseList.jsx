import { AnimatePresence, motion } from "framer-motion"
import { Receipt, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { CATEGORIES } from "../utils/categories"
import ExpenseCard from "./ExpenseCard"
import { ExpenseCardSkeleton } from "./Skeleton"

const SORT_OPTIONS = [
  { id: "date-desc", label: "Newest first" },
  { id: "date-asc", label: "Oldest first" },
  { id: "amount-desc", label: "Highest amount" },
  { id: "amount-asc", label: "Lowest amount" },
]

const getCategoryLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label || "Other"

const ExpenseList = ({ expenses, loading, onEdit, onDelete }) => {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sort, setSort] = useState("date-desc")

  const filtered = useMemo(() => {
    let result = [...expenses]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (e) =>
          e.description?.toLowerCase().includes(q) ||
          getCategoryLabel(e.category).toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== "all") {
      result = result.filter((e) => e.category === categoryFilter)
    }

    result.sort((a, b) => {
      switch (sort) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date)
        case "amount-desc":
          return Number(b.amount) - Number(a.amount)
        case "amount-asc":
          return Number(a.amount) - Number(b.amount)
        default:
          return new Date(b.date) - new Date(a.date)
      }
    })

    return result
  }, [expenses, search, categoryFilter, sort])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            strokeWidth={1.75}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            className="form-input pl-10"
            placeholder="Search expenses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search expenses"
          />
        </div>
        <div className="flex gap-3">
          <select
            className="form-input sm:min-w-[140px] w-full sm:w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            className="form-input sm:min-w-[148px] w-full sm:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort expenses"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3" aria-busy="true" aria-label="Loading expenses">
          {Array.from({ length: 4 }).map((_, i) => (
            <ExpenseCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          className="glass-card p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="icon-box w-12 h-12 mx-auto mb-4">
            <Receipt size={20} strokeWidth={1.75} />
          </div>
          <h4 className="text-h2 mb-2">
            {expenses.length === 0 ? "No expenses yet" : "No results"}
          </h4>
          <p className="text-caption max-w-xs mx-auto">
            {expenses.length === 0
              ? "Add your first expense to start tracking."
              : "Try a different search or filter."}
          </p>
        </motion.div>
      ) : (
        <div>
          <p className="text-caption mb-4">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((expense, i) => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  index={i}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseList
