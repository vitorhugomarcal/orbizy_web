import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./app"
import { ThemeProvider } from "./components/theme-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)
