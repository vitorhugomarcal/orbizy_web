import { api } from "@/lib/axios"

interface ClientData {
  type: string
  email_address: string
  name: string
  company_name?: string
  cpf?: string
  cnpj?: string
  phone: string
  cep: string
  address: string
  address_number: string
  neighborhood: string
  state: string
  city: string
}

export async function postClient(data: ClientData) {
  const response = await api.post("/client/register", data)

  return response.data
}
