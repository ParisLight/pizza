import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import type { ConfigEnv, UserConfig } from "vite"

export const buildPlugins = ({ command }: ConfigEnv): UserConfig["plugins"] => {
  const isDev = command === "serve"

  const autoResolvers = [
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "components.d.ts",
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"],
      dts: "auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
  ]

  return [vue(), ...(isDev ? [vueDevTools()] : []), ...autoResolvers]
}
