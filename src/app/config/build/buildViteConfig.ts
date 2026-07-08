import type { ConfigEnv, UserConfig } from "vite"
import { buildPlugins } from "./buildPlugins"
import { buildResolve } from "./buildResolve"

export const buildViteConfig = (env: ConfigEnv): UserConfig => ({
  base: "/",
  plugins: buildPlugins(env),
  resolve: buildResolve(),
})
