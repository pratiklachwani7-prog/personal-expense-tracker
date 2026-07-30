import { useMemo, useState } from "react"
import { Toaster } from "react-hot-toast"
import BackgroundOrbs from "./components/BackgroundOrbs"
import DeleteModal from "./components/DeleteModal"
import ExpenseChart from "./components/ExpenseChart"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import StatsCards from "./components/StatsCards"
import { useExpenses } from "./hooks/useExpenses"

const isToday = (dateStr) => {
  const d = new Date(dateStr)
  const now = new Date()
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  )
}

const App = () => {
  const {
    expenses,
    loading,
    submitting,
    createExpense,
    editExpense,
    removeExpense,
  } = useExpenses()

  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const stats = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const total = expenses.reduce((s, e) => s + Number(e.amount), 0)
    const monthly = expenses
      .filter((e) => {
        const d = new Date(e.date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      })
      .reduce((s, e) => s + Number(e.amount), 0)
    const today = expenses
      .filter((e) => isToday(e.date))
      .reduce((s, e) => s + Number(e.amount), 0)

    return { total, monthly, today, count: expenses.length }
  }, [expenses])

  const openAdd = () => {
    setEditTarget(null)
    setFormOpen(true)
  }

  const openEdit = (expense) => {
    setEditTarget(expense)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditTarget(null)
  }

  const handleSubmit = async (form, billFile) => {
    if (editTarget) return editExpense(editTarget._id, form, billFile)
    return createExpense(form, billFile)
  }

  const handleDelete = async (id) => {
    const success = await removeExpense(id)
    if (success) setDeleteTarget(null)
  }

  return (
    <>
      <BackgroundOrbs />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--text-sm)",
            boxShadow: "var(--shadow-lg)",
          },
        }}
      />

      <div className="scroll-content">
        <Navbar onAddClick={openAdd} />
        <Hero totalSpent={stats.total} />

        <section
          id="dashboard"
          className="page-container pb-16 lg:pb-20"
          aria-labelledby="dashboard-heading"
        >
          <header className="section-header pt-4">
            <h2 id="dashboard-heading" className="text-h1 font-heading mb-2">
              Dashboard
            </h2>
            <p className="text-body">
              Overview of your spending and recent transactions.
            </p>
          </header>

          <div className="section-gap">
            <StatsCards stats={stats} loading={loading} />

            <div className="dashboard-grid">
              <ExpenseChart expenses={expenses} loading={loading} />

              <div>
                <header className="mb-6">
                  <h3 className="text-h2 font-heading mb-1">Recent expenses</h3>
                  <p className="text-caption">Search, filter, and manage</p>
                </header>
                <ExpenseList
                  expenses={expenses}
                  loading={loading}
                  onEdit={openEdit}
                  onDelete={setDeleteTarget}
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[var(--border-subtle)] py-8">
          <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-caption">© {new Date().getFullYear()} ExpenseFlow</p>
            <p className="text-caption">Personal expense tracker</p>
          </div>
        </footer>
      </div>

      <ExpenseForm
        isOpen={formOpen}
        onClose={closeForm}
        onSubmit={handleSubmit}
        initialData={editTarget}
        submitting={submitting}
      />

      <DeleteModal
        expense={deleteTarget}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
        submitting={submitting}
      />
    </>
  )
}

export default App
