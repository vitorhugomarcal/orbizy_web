import { api } from "@/lib/axios"

interface SupplierData {
  email_address: string
  company_name: string
  cpf: string
  cnpj: string
  phone: string
  cep: string
  address: string
  address_number: string
  neighborhood: string
  state: string
  city: string
}

export async function postSupplier(data: SupplierData) {
  const response = await api.post("/supplier/create", data)

  return response.data
}
