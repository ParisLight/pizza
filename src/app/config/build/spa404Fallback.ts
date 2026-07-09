import fs from "node:fs"
import path from "node:path"
import type { Plugin } from "vite"

export const spa404Fallback = (): Plugin => ({
  name: "spa-404-fallback",
  apply: "build",
  closeBundle() {
    const outDir = path.resolve("dist")
    const indexPath = path.join(outDir, "index.html")
    const fallbackPath = path.join(outDir, "404.html")

    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, fallbackPath)
    }
  },
})
