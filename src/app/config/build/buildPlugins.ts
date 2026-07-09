import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import type { ConfigEnv, UserConfig } from "vite"
import { spa404Fallback } from "./spa404Fallback"

export const buildPlugins = ({ command }: ConfigEnv): UserConfig["plugins"] => {
  const isDev = command === "serve"

  const autoResolvers = [
    Components({
      resolvers: [ElementPlusResolver()],
      dts: isDev ? "components.d.ts" : false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"],
      dts: isDev ? "auto-imports.d.ts" : false,
      eslintrc: {
        enabled: true,
      },
    }),
  ]

  return [
    vue(),
    ...(isDev ? [vueDevTools()] : []),
    ...autoResolvers,
    ...(isDev ? [] : [spa404Fallback()]),
  ]
}
