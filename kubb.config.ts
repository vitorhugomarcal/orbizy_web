import { defineConfig } from "@kubb/core"
import { pluginOas } from "@kubb/plugin-oas"
import { pluginReactQuery } from "@kubb/plugin-react-query"
import { pluginTs } from "@kubb/plugin-ts"

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "./swagger.json",
    },
    output: {
      path: "./src/http/generated",
    },
    hooks: {
      done: [],
    },
    plugins: [
      pluginOas({
        generators: [],
        validate: false,
      }),
      pluginTs({
        output: {
          path: "models",
        },
      }),
      pluginReactQuery({
        output: {
          path: "./hooks",
        },
        paramsType: "inline",
        pathParamsType: "object",
        suspense: false,
        client: {
          baseURL: process.env.VITE_API_URL || "https://api.orbizy.app",
          dataReturnType: "data",
        },
      }),
    ],
  }
})
