"use client"

import { useEffect, useState, useCallback, useDeferredValue } from "react"
import { getOrders } from "../src/lib/api"

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  amount: number
  status: string
  created_at: string
}

const LIMIT = 10
const REFRESH_MS = 30000

export function useDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const deferredSearch = useDeferredValue(search)

  const fetchData = useCallback(
    async (p: number, s: string, st: string) => {
      const token = localStorage.getItem("token")

      if (!token) {
        window.location.href = "/login"
        return
      }

      setLoading(true)

      try {
        const data = await getOrders(token, {
          search: s,
          status: st,
          page: p,
          limit: LIMIT
        })

        setOrders(data.data)
        setTotal(data.total)
      } catch {
        localStorage.removeItem("token")
        window.location.href = "/login"
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    setPage(1)
    fetchData(1, deferredSearch, statusFilter)
  }, [deferredSearch, statusFilter])

  useEffect(() => {
    fetchData(page, deferredSearch, statusFilter)
  }, [page])

  useEffect(() => {
    const id = setInterval(() => {
      fetchData(page, deferredSearch, statusFilter)
    }, REFRESH_MS)

    return () => clearInterval(id)
  }, [page, deferredSearch, statusFilter])

  return {
    orders,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    total,
    LIMIT
  }
}