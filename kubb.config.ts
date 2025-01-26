import { defineConfig } from "@kubb/core"
import { pluginClient } from "@kubb/plugin-client"
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
    plugins: [
      pluginOas(),
      pluginTs({
        output: {
          path: "models",
        },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Controller`,
        },
      }),
      pluginReactQuery({
        output: {
          path: "./hooks",
        },

        client: {
          baseURL: "https://api.orbizy.app",
        },
      }),
      pluginClient({
        baseURL: "https://api.orbizy.app",
        client: "axios",
      }),
    ],
  }
})
