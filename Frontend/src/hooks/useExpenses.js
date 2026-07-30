import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  addExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "../api/expenseApi"

const buildFormData = (data, billFile) => {
  const formData = new FormData()
  formData.append("amount", data.amount)
  formData.append("description", data.description)
  formData.append("category", data.category)
  formData.append("date", data.date)
  if (billFile) formData.append("bill", billFile)
  return formData
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await fetchExpenses()
      setExpenses(data.posts || [])
    } catch {
      toast.error("Failed to load expenses. Is the backend running?")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  const createExpense = async (formValues, billFile) => {
    try {
      setSubmitting(true)
      const formData = buildFormData(formValues, billFile)
      const { data } = await addExpense(formData)
      setExpenses((prev) => [data.post, ...prev])
      toast.success("Expense added!")
      return true
    } catch {
      toast.error("Failed to add expense")
      return false
    } finally {
      setSubmitting(false)
    }
  }

  const editExpense = async (id, formValues, billFile) => {
    try {
      setSubmitting(true)
      const formData = buildFormData(formValues, billFile)
      const { data } = await updateExpense(id, formData)
      setExpenses((prev) =>
        prev.map((e) => (e._id === id ? data.updatedExpense : e))
      )
      toast.success("Expense updated!")
      return true
    } catch {
      toast.error("Failed to update expense")
      return false
    } finally {
      setSubmitting(false)
    }
  }

  const removeExpense = async (id) => {
    try {
      setSubmitting(true)
      await deleteExpense(id)
      setExpenses((prev) => prev.filter((e) => e._id !== id))
      toast.success("Expense deleted")
      return true
    } catch {
      toast.error("Failed to delete expense")
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return {
    expenses,
    loading,
    submitting,
    loadExpenses,
    createExpense,
    editExpense,
    removeExpense,
  }
}
