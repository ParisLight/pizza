import { fileURLToPath, URL } from "node:url"
import type { UserConfig } from "vite"

export const buildResolve = (): UserConfig["resolve"] => ({
  alias: {
    "@": fileURLToPath(new URL("../../../", import.meta.url)),
  },
})
