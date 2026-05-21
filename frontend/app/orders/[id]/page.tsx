"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getOrderById } from "../../src/lib/api"
import { ArrowLeft } from "lucide-react"

interface Order {
  id: string
  customer_name: string
  customer_email: string
  amount: number
  status: string
  payment_method: string
  created_at: string
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  paid: { label: "Pagada", bg: "bg-green-100", text: "text-green-700" },
  pending: { label: "Pendiente", bg: "bg-yellow-100", text: "text-yellow-700" },
  failed: { label: "Fallida", bg: "bg-red-100", text: "text-red-700" },
  refunded: { label: "Reembolsada", bg: "bg-blue-100", text: "text-blue-700" }
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/login")
        return
      }

      try {
        const data = await getOrderById(token, id as string)
        setOrder(data)
      } catch {
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return <div className="p-10 text-center">Cargando...</div>
  }

  if (!order) {
    return <div className="p-10 text-center">No encontrado</div>
  }

  const status = STATUS_CONFIG[order.status]

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Detalle de Orden
            </h1>
            <p className="text-sm text-gray-500">
              Información completa de la transacción
            </p>
          </div>

          {/* 🔥 BOTÓN REGRESAR */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
                       bg-blue-50 text-blue-600 
                       hover:bg-blue-600 hover:text-white 
                       transition"
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">

          {/* STATUS + MONTO */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.text}`}>
                {status.label}
              </span>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Monto</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${order.amount.toLocaleString("es-MX")}
              </p>
            </div>
          </div>

          {/* GRID INFO */}
          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p className="text-xs text-gray-400">Cliente</p>
              <p className="text-gray-900 font-medium">{order.customer_name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-gray-900">{order.customer_email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Método de pago</p>
              <p className="text-gray-900">{order.payment_method}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Fecha</p>
              <p className="text-gray-900">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs text-gray-400">ID</p>
              <p className="text-gray-500 text-sm break-all">{order.id}</p>
            </div>

          </div>
        </div>

        {/* 🔥 TIMELINE PRO */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <p className="text-sm text-gray-500 mb-4">Actividad</p>

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1" />
              <div>
                <p className="text-sm text-gray-900">Orden creada</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1" />
              <div>
                <p className="text-sm text-gray-900">Pago procesado</p>
                <p className="text-xs text-gray-400">Procesamiento exitoso</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mt-1" />
              <div>
                <p className="text-sm text-gray-900">
                  Estado actual: {status.label}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}