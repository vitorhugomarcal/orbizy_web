import { z } from "zod"

const developmentSchema = z.object({
  VITE_API_URL: z.string().url().default("http://192.168.1.81:3333"),
})

const productionSchema = z.object({
  VITE_API_URL: z.string().url().default("https://api.orbizy.app"),
})

const envSchema =
  import.meta.env.MODE === "development" ? developmentSchema : productionSchema

export const env = envSchema.parse(import.meta.env)
