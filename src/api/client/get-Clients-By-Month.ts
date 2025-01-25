import { api } from "@/lib/axios"

export interface GetClientByMonthProps {
  total: number
  new: number
}
export async function getClientsByMonth() {
  const { data } = await api.get<GetClientByMonthProps>("/clients/month")

  if (!data) {
    return {
      total: 0,
      new: 0,
    }
  }

  return data
}
