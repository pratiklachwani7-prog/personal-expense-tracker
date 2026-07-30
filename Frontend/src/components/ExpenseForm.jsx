import { AnimatePresence, motion } from "framer-motion"
import { ImagePlus, Loader2, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { CATEGORIES } from "../utils/categories"
import { getCategoryIcon } from "../utils/categoryIcons"
import { formatDateInput } from "../utils/formatters"

const EMPTY_FORM = {
  amount: "",
  description: "",
  category: "food",
  date: new Date().toISOString().split("T")[0],
}

const ExpenseForm = ({ isOpen, onClose, onSubmit, initialData, submitting }) => {
  const [form, setForm] = useState(EMPTY_FORM)
  const [billFile, setBillFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)
  const isEdit = Boolean(initialData)

  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount,
        description: initialData.description || "",
        category: initialData.category || "food",
        date: formatDateInput(initialData.date),
      })
      setPreview(initialData.bill || null)
    } else {
      setForm(EMPTY_FORM)
      setPreview(null)
    }
    setBillFile(null)
  }, [initialData, isOpen])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFile = (file) => {
    if (!file?.type.startsWith("image/")) return
    setBillFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.amount || !form.description) return
    const success = await onSubmit(form, billFile)
    if (success) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="expense-form-title"
        >
          <motion.div
            className="glass-card w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id="expense-form-title" className="text-h1 font-heading">
                {isEdit ? "Edit expense" : "Add expense"}
              </h3>
              <button
                type="button"
                className="btn-ghost !h-8 !w-8 !p-0"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="amount" className="text-label block mb-2">
                  Amount (₹)
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  className="form-input ticker-number"
                  placeholder="0"
                  min="1"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="text-label block mb-2">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  className="form-input"
                  placeholder="What was this for?"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="text-label block mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-input"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="text-label block mb-2">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    className="form-input"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <span className="text-label block mb-2">
                  Receipt <span className="normal-case tracking-normal text-[var(--text-disabled)]">(optional)</span>
                </span>
                <div
                  className={`upload-zone ${dragOver ? "drag-over" : ""}`}
                  onClick={() => fileRef.current?.click()}
                  onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload receipt image"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Receipt preview"
                      className="max-h-28 mx-auto rounded-md object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <ImagePlus size={20} strokeWidth={1.5} className="text-[var(--text-muted)]" />
                      <p className="text-sm text-[var(--text-secondary)]">
                        Drop image or click to upload
                      </p>
                      <p className="text-caption">PNG or JPG</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = getCategoryIcon(cat.icon)
                  const active = form.category === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`category-badge cursor-pointer transition-opacity ${
                        active ? "opacity-100 ring-1 ring-[var(--border-focus)]" : "opacity-50 hover:opacity-80"
                      }`}
                      style={{
                        background: `${cat.color}18`,
                        color: cat.color,
                      }}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, category: cat.id }))
                      }
                    >
                      <Icon size={12} strokeWidth={2} />
                      {cat.label.split(" & ")[0]}
                    </button>
                  )
                })}
              </div>

              <button
                type="submit"
                className="btn-glow btn-lg w-full mt-2"
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                )}
                {submitting
                  ? "Saving…"
                  : isEdit
                    ? "Update expense"
                    : "Save expense"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExpenseForm
