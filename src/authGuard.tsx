import { Navigate } from "react-router"

import { useQuery } from "@tanstack/react-query"
import { getProfile } from "./api/get-Profile"
import { AppLayout } from "./pages/_layouts/app"

export function AuthGuard() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  })

  if (isLoading) {
    return null // ou seu componente de loading
  }

  if (profile?.error === "Unauthorized" || !profile) {
    return <Navigate to="/sign-in" replace />
  }

  return <AppLayout />
}
