"use client"

import { useEffect, useState } from "react"
import { getOrders } from "../src/lib/api"

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { window.location.href = "/login"; return }

    getOrders(token)
      .then(data => setOrders(data.data))
      .catch(() => { localStorage.removeItem("token"); window.location.href = "/login" })
      .finally(() => setLoading(false))
  }, [])

  const total = orders.length
  const revenue = orders.reduce((acc, o) => acc + o.amount, 0)
  const failed = orders.filter(o => o.status === "failed").length
  const completed = orders.filter(o => o.status === "completed").length

  const statusConfig: Record<string, { label: string; style: string }> = {
    completed: { label: "Completada", style: "bg-green-50 text-green-700" },
    failed:    { label: "Fallida",    style: "bg-red-50 text-red-600"   },
    pending:   { label: "Pendiente",  style: "bg-amber-50 text-amber-700" },
    default:   { label: "En proceso", style: "bg-gray-100 text-gray-500" },
  }

  const getStatus = (s: string) => statusConfig[s] ?? statusConfig.default

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Órdenes</h1>
            <p className="text-sm text-gray-400 mt-0.5">Resumen general de transacciones</p>
          </div>
          
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total órdenes", value: total, sub: "este mes" },
            { label: "Ingresos", value: `$${revenue.toLocaleString()}`, sub: "MXN acumulado" },
            { label: "Fallidas", value: failed, sub: `${((failed/total)*100).toFixed(1)}% del total`, danger: true },
            { label: "Completadas", value: completed, sub: `${((completed/total)*100).toFixed(1)}% del total`, success: true },
          ].map((k) => (
            <div key={k.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{k.label}</p>
              <p className={`text-2xl font-medium ${k.danger ? "text-red-600" : k.success ? "text-green-600" : "text-gray-900"}`}>
                {k.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Cliente", "Correo", "Monto", "Estado", "Fecha"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const s = getStatus(o.status)
                return (
                  <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{o.customer_name}</td>
                    <td className="px-4 py-3 text-gray-400">{o.customer_email}</td>
                    <td className="px-4 py-3 text-gray-900">${o.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${s.style}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {new Date(o.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}