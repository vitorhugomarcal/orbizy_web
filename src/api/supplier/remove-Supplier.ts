import { api } from "@/lib/axios"

export interface GetSupplierProps {
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
  email_address: string
  createdAt: Date
  error: string
}
export async function removeSupplier(supplierId: string) {
  await api.delete(`/supplier/remove/${supplierId}`)
}
