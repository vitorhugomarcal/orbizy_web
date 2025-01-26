import { defineConfig } from "@kubb/core"
// import { pluginClient } from "@kubb/plugin-client"
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
      clean: true,
    },
    hooks: { done: [] },
    plugins: [
      pluginOas({ generators: [], validate: false }),
      pluginTs({
        output: {
          path: "models",
        },
        group: {
          type: "tag",
          name: ({ group }) => `${group}Controller`,
        },
      }),
      // pluginClient({
      //   baseURL: "https://api.orbizy.app",
      //   output: {
      //     path: ".",
      //   },
      //   group: {
      //     type: "tag",
      //     name: ({ group }) => `${group}Controller`,
      //   },
      //   importPath: "../../client-fetch.ts",
      // }),
      pluginReactQuery({
        output: {
          path: "./hooks",
        },
        client: {
          baseURL: "https://api.orbizy.app",
          importPath: "../../client.ts",
        },
      }),
    ],
  }
})
