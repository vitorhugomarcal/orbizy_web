import { api } from "@/lib/axios"

export interface GetSupplierProps {
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
  email_address: string
  supplierUser: {
    supplier_id: string
    company_id: string
  }
}
export async function getSuppliers() {
  const { data } = await api.get<GetSupplierProps[]>("/company/suppliers")

  if (!data) {
    return []
  }
  return data
}
