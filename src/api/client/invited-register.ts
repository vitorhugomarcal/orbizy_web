import { api } from "@/lib/axios"

interface RegisterClientData {
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
  code: string
}

export async function InvitedRegister(data: RegisterClientData) {
  const response = await api.post("/invited/client/register", data)

  return response.data
}
