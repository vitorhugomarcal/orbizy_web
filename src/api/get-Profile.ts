import { api } from "@/lib/axios"

export interface GetProfileResponse {
  name: string
  email: string
  id: string
  role: "MASTER" | "BASIC"
  type: "basic" | "pro" | "team"
  company_id: string
  createdAt: Date
  avatar: "/avatars/shadcn.jpg"
  error: string
  company: {
    id: string
  }
}
export async function getProfile() {
  try {
    const { data } = await api.get("/me")

    const user: GetProfileResponse = data

    return user
  } catch (error) {
    throw error
  }
}
