import { api } from "@/lib/axios"

export interface inviteParams {
  companyId: string
}
export async function inviteClient({ companyId }: inviteParams) {
  const response = await api.post(`/invite/client/${companyId}`)

  return response.data
}
