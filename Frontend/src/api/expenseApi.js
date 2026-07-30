import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
})

export const fetchExpenses = () => api.get("/save-Expenses")

export const addExpense = (formData) =>
  api.post("/add-Expense", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

export const updateExpense = (id, formData) =>
  api.patch(`/Expenses/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

export const deleteExpense = (id) => api.delete(`/Expenses/${id}`)
