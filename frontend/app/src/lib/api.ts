const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    throw new Error("Invalid credentials")
  }

  return res.json()
}
export async function getOrders(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch orders")
  }

  return res.json()
}