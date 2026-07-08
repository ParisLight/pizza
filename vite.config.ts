import { defineConfig } from "vite"
import { buildViteConfig } from "./src/app/config/build"

export default defineConfig((env) => buildViteConfig(env))
