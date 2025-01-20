import { api } from "@/lib/axios"
import type { GetClientProps } from "./client/get-Clients"

export interface GetInvoiceProps {
  status: string
  id: string
  company_id: string
  createdAt: Date
  notes: string
  invoice_number: string
  sub_total: number
  total: number
  client_id: string
  client: GetClientProps
}
export async function getInvoices() {
  const { data } = await api.get<GetInvoiceProps[]>("/company/invoices")

  if (!data) {
    return []
  }
  return data
}
