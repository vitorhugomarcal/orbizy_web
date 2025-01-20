import { api } from "@/lib/axios"

export interface GetClientProps {
  state: string
  type: string
  id: string
  name: string
  company_id: string
  cnpj: string
  phone: string
  city: string
  cep: string
  address: string
  neighborhood: string
  address_number: string
  company_name: string
  cpf: string
  email_address: string
  createdAt: Date
  error: string
  invoice: {
    id: string
    company_id: string
    createdAt: Date
    status: string
    invoice_number: string
    notes: string
    sub_total: number
    total: number
    client_id: string
  }[]
}
export async function getClients() {
  const { data } = await api.get<GetClientProps[]>("/company/clients")

  if (!data) {
    return []
  }
  return data
}
