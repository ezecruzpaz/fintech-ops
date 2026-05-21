"use client"
import { useRouter } from "next/navigation"
import { Eye } from "lucide-react"

interface Order {
    id: string
    customer_name: string
    customer_email: string
    amount: number
    status: string
    created_at: string
}

interface Props {
    orders: Order[]
    loading: boolean
    search: string
    setSearch: (v: string) => void
    statusFilter: string
    setStatusFilter: (v: string) => void
    page: number
    setPage: (v: number) => void
    total: number
    LIMIT: number
}

const STATUS_LABELS: Record<string, string> = {
    paid: "Pagada",
    pending: "Pendiente",
    failed: "Fallida",
    refunded: "Reembolsada"
}


const STATUS_COLORS: Record<string, string> = {
    paid: "text-green-600",
    pending: "text-yellow-600",
    failed: "text-red-600",
    refunded: "text-blue-600"
}

const fmt = (n: number) =>
    "$" + n.toLocaleString("es-MX")

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("es-MX")

export function DashboardView({
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
}: Props) {

    const router = useRouter()
    const pages = Math.ceil(total / LIMIT) || 1


    const revenue = orders.reduce((acc, o) => acc + o.amount, 0)
    const failed = orders.filter(o => o.status === "failed").length
    const completed = orders.filter(o => o.status === "paid").length
    const pending = orders.filter(o => o.status === "pending").length

    const successRate = total
        ? ((completed / total) * 100).toFixed(1)
        : "0.0"

    const successColor =
        Number(successRate) > 80
            ? "text-green-600"
            : Number(successRate) > 50
                ? "text-yellow-600"
                : "text-red-600"

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Órdenes</h1>
                    <p className="text-sm text-gray-600">Resumen general</p>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                    {/* TOTAL */}
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-xs text-gray-500">Total órdenes</p>
                        <p className="text-xl text-gray-900 font-semibold">{total}</p>
                    </div>

                    {/* REVENUE */}
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-xl text-gray-900 font-semibold">
                            {fmt(revenue)}
                        </p>
                    </div>

                    {/* PAGADAS */}
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-xs text-gray-500">Pagadas</p>
                        <p className="text-xl text-green-600">{completed}</p>
                        <p className="text-xs text-gray-400">
                            {completed} de {total}
                        </p>
                    </div>

                    {/* FALLIDAS */}
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-xs text-gray-500">Fallidas</p>
                        <p className="text-xl text-red-600">{failed}</p>
                        <p className="text-xs text-gray-400">
                            {failed} de {total}
                        </p>
                    </div>

                    {/* PENDIENTES */}
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-xs text-gray-500">Pendientes</p>
                        <p className="text-xl text-yellow-600">{pending}</p>
                        <p className="text-xs text-gray-400">
                            {pending} de {total}
                        </p>
                    </div>

                    {/* SUCCESS */}
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-xs text-gray-500">Tasa de éxito</p>

                        <p className={`text-xl font-semibold ${successColor}`}>
                            {successRate}%
                        </p>

                        <p className="text-xs text-gray-400">
                            {completed} de {total} órdenes
                        </p>
                    </div>

                </div>

                {/* FILTROS */}
                <div className="flex gap-3 flex-wrap">
                    <input
                        className="flex-1 h-10 border border-gray-300 rounded-lg px-3 text-gray-900"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="h-10 border border-gray-300 rounded-lg px-3 text-gray-900"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="paid">Pagada</option>
                        <option value="pending">Pendiente</option>
                        <option value="failed">Fallida</option>
                        <option value="refunded">Reembolsada</option>
                    </select>
                </div>

                {/* TABLA */}
                <div className="bg-white border rounded-xl overflow-hidden">

                    {loading ? (
                        <div className="p-6 text-center text-gray-600">Cargando...</div>
                    ) : orders.length === 0 ? (
                        <div className="p-6 text-center text-gray-600">Sin resultados</div>
                    ) : (
                        <table className="w-full text-sm">

                            <thead>
                                <tr className="border-b">
                                    <th className="p-3 text-center text-gray-700 font-medium">Cliente</th>
                                    <th className="p-3 text-center text-gray-700 font-medium">Email</th>
                                    <th className="p-3 text-center text-gray-700 font-medium">Monto</th>
                                    <th className="p-3 text-center text-gray-700 font-medium">Estado</th>
                                    <th className="p-3 text-center text-gray-700 font-medium">Fecha</th>
                                    <th className="p-3 text-center text-gray-700 font-medium">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id} className="p-3 text-center font-medium text-gray-900">

                                        <td className="p-3 text-gray-900 font-medium">
                                            {o.customer_name}
                                        </td>

                                        <td className="p-3 text-gray-700">
                                            {o.customer_email}
                                        </td>

                                        <td className="p-3 text-gray-900">
                                            {fmt(o.amount)}
                                        </td>

                                        <td className={`p-3 ${STATUS_COLORS[o.status]}`}>
                                            {STATUS_LABELS[o.status] || o.status}
                                        </td>

                                        <td className="p-3 text-gray-600">
                                            {fmtDate(o.created_at)}
                                        </td>


                                        <td className="p-3">
                                            <div className="flex justify-center items-center">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        router.push(`/orders/${o.id}`)
                                                    }}
                                                    className="flex items-center justify-center w-9 h-9 rounded-lg 
                 bg-blue-50 text-blue-600 
                 hover:bg-blue-600 hover:text-white 
                 transition-all duration-200 shadow-sm hover:shadow-md"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    )}
                </div>

                {/* PAGINACIÓN */}

                <div className="flex flex-col md:flex-row justify-between items-center gap-3">

                    {/* INFO */}
                    <span className="text-sm text-gray-600">
                        Mostrando página <b>{page}</b> de <b>{pages}</b>
                    </span>

                    {/* CONTROLES */}
                    <div className="flex items-center gap-2">

                        {/* PREV */}
                        <button
                            onClick={() => setPage(Math.max(page - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-lg border text-sm 
                 bg-white text-gray-700 
                 hover:bg-gray-100 
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition"
                        >
                            ← Anterior
                        </button>

                        {/* NUMERO ACTUAL */}
                        <div className="px-3 py-1.5 rounded-lg border text-sm 
                 bg-white text-gray-700 
                 hover:bg-gray-100 
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transitionfont-medium shadow-sm">
                            {page}
                        </div>

                        {/* NEXT */}
                        <button
                            onClick={() => setPage(Math.min(page + 1, pages))}
                            disabled={page >= pages}
                            className="px-3 py-1.5 rounded-lg border text-sm 
                 bg-white text-gray-700 
                 hover:bg-gray-100 
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition"
                        >
                            Siguiente →
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}