const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) throw new Error(" Credenciales Invalidas")
  return res.json()
}

export async function getOrders(
  token: string,
  params: {
    search?: string
    status?: string
    page?: number
    limit?: number
  } = {}
) {
  const query = new URLSearchParams()

  if (params.search) query.append("search", params.search)
  if (params.status) query.append("status", params.status)
  if (params.page)   query.append("page",   String(params.page))
  if (params.limit)  query.append("limit",  String(params.limit))

  const res = await fetch(
    `${API_URL}/orders?${query.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  if (!res.ok) throw new Error("No se pudieron obtener los pedidos")
  return res.json()
}
export async function getOrderById(token: string, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error("Error")

  return res.json()
}