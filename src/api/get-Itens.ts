import { api } from "@/lib/axios"

export interface GetItensProps {
  id: string
  name: string
  company_id: string
  price: number
  description: string
  unit: string
}
export async function getItens() {
  const { data } = await api.get<GetItensProps[]>("/company/itens")

  if (!data) {
    return []
  }
  return data
}
