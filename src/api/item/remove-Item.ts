import { api } from "@/lib/axios"

export interface GetItemProps {
  id: string
  amount: number
  name: string
  und: string
}
export async function removeItem(itemId: string) {
  await api.delete(`/itens/remove/${itemId}`)
}
