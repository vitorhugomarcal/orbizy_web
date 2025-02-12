import { api } from "@/lib/axios"

export interface GetClientProps {
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
export async function removeEstimate(estimateId: string) {
  await api.delete(`/estimate/remove/${estimateId}`)
}
