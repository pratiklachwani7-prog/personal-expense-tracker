import { motion } from "framer-motion"
import { Plus, Wallet } from "lucide-react"

const Navbar = ({ onAddClick }) => (
  <motion.header
    className="navbar"
    initial={{ y: -16, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="page-container h-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="icon-box" aria-hidden="true">
          <Wallet size={18} strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="font-heading text-base font-semibold tracking-tight text-[var(--text-primary)]">
            ExpenseFlow
          </h1>
          <p className="text-caption hidden sm:block">Expense tracker</p>
        </div>
      </div>

      <button
        type="button"
        className="btn-glow"
        onClick={onAddClick}
        aria-label="Add expense"
      >
        <Plus size={16} strokeWidth={2} />
        <span className="hidden sm:inline">Add expense</span>
        <span className="sm:hidden">Add</span>
      </button>
    </div>
  </motion.header>
)

export default Navbar
