import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, Loader2, X } from "lucide-react"
import { formatCurrency } from "../utils/formatters"

const DeleteModal = ({ expense, onConfirm, onClose, submitting }) => (
  <AnimatePresence>
    {expense && (
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-desc"
      >
        <motion.div
          className="glass-card relative w-full max-w-sm p-6"
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-4 btn-ghost !h-8 !w-8 !p-0"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={16} strokeWidth={1.75} />
          </button>

          <div className="w-10 h-10 rounded-lg bg-[var(--color-danger-muted)] flex items-center justify-center mb-4">
            <AlertTriangle size={20} strokeWidth={1.75} className="text-red-400" />
          </div>

          <h3 id="delete-title" className="text-h1 font-heading mb-2">
            Delete expense?
          </h3>
          <p id="delete-desc" className="text-body mb-1">
            &ldquo;{expense.description}&rdquo; will be permanently removed.
          </p>
          <p className="ticker-number text-lg font-semibold text-[var(--text-primary)] mb-6">
            {formatCurrency(expense.amount)}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              className="btn-ghost flex-1 !h-10"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-danger-solid flex-1 !h-10 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2"
              onClick={() => onConfirm(expense._id)}
              disabled={submitting}
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default DeleteModal
