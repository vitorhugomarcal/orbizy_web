import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://api.orbizy.app"),
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
})

export const env = envSchema.parse(import.meta.env)
