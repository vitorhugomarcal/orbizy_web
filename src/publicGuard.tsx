import { Navigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "./api/get-Profile"
import { AuthLayout } from "./pages/_layouts/auth"

export function PublicGuard() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  })

  if (isLoading) {
    return null
  }

  if (profile?.id) {
    return <Navigate to="/" replace />
  }

  return <AuthLayout />
}
