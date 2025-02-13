import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      "Permissions-Policy":
        "interest-cohort=(), private-state-token-redemption=(), private-state-token-issuance=(), browsing-topics=()",
    },
    proxy: {
      "/api": {
        target: "https://receitaws.com.br",
        changeOrigin: true,
        secure: true, // Se necessário, desabilite a verificação SSL
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/cep": {
        target: "https://viacep.com.br",
        changeOrigin: true,
        secure: true, // Se necessário, desabilite a verificação SSL
        rewrite: (path) => path.replace(/^\/cep/, ""),
      },
    },
  },
})
