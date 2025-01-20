import { api } from "@/lib/axios"

export interface GetCompanyProps {
  id: string
  cnpj: string
  phone: string
  state: string
  city: string
  cep: string
  address: string
  neighborhood: string
  address_number: string
  company_name: string
  owner_id: string
}
export async function getCompany() {
  const { data } = await api.get<GetCompanyProps>("/company")

  if (!data) {
    return
  }
  return data
}
