import { api } from "@/lib/axios"

export interface GetEstimatesProps {
  status: string
  id: string
  company_id: string
  createdAt: Date
  estimate_number: string
  notes: string
  supplier_id: string
}
export async function getEstimates() {
  const { data } = await api.get<GetEstimatesProps[]>("/estimates")

  if (!data) {
    return []
  }
  return data
}
