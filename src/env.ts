import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("https://api.orbizy.app"),
  VITE_ENV: z.enum(["development", "production", "test"]).default("production"),
})

export const env = envSchema.parse(import.meta.env)
