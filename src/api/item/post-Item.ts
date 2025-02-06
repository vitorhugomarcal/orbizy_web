import { api } from "@/lib/axios"

interface ItemData {
  name: string
  description: string
  price: number
  unit: string
}

export async function postItem(data: ItemData) {
  const response = await api.post("/itens/create", data)

  return response.data
}
