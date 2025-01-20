import { api } from "@/lib/axios"
import type { GetSupplierProps } from "./get-Suppliers"

export type GetSupplierEstimateProps = {
  id: string
  status: string
  estimate_number: string
  notes: string
  createdAt: Date
  supplier_id: string
  company_id: string
  estimateItems: {
    id: string
    name: string
    createdAt: Date
    quantity: number
    estimate_id: string
  }[]
  supplier: GetSupplierProps
}
export async function getSuppliersEstimates() {
  const { data } = await api.get<GetSupplierEstimateProps[]>(
    "/company/suppliers/estimate"
  )

  if (!data) {
    return []
  }
  return data
}
