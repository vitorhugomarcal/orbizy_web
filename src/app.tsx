import "./global.css"

import { Helmet, HelmetProvider } from "react-helmet-async"
import { RouterProvider } from "react-router/dom"
import { Toaster } from "sonner"

import { router } from "./routes"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"
export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Orbizy" />
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
