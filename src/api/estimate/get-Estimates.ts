import { api } from "@/lib/axios"
import type { GetClientProps } from "../client/get-Clients"

export interface GetEstimatesProps {
  id: string
  estimate_number: string
  status: string
  notes: string
  sub_total: number
  total: number
  client_id: string
  createdAt: Date
  client: GetClientProps
}
export async function getEstimates() {
  const { data } = await api.get<GetEstimatesProps[]>("/estimate")

  if (!data) {
    return []
  }
  return data
}
