import { api } from "@/lib/axios"

export interface inviteParams {
  code: string
}
export async function checkInvite({ code }: inviteParams) {
  const response = await api.get(`/invite/validate/${code}`)

  return response.data
}
