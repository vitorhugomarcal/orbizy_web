import { api } from "@/lib/axios"
export async function removeSupplierEstimate(estimateId: string) {
  await api.delete(`/supplier/estimate/remove/${estimateId}`)
}
