import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import { defineConfig } from "eslint/config"
import autoImportGlobals from "./.eslintrc-auto-import.json" with { type: "json" }

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      globals: { ...globals.browser, ...autoImportGlobals.globals },
    },
    plugins: { js },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],

  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json", "./tsconfig.vitest.json"],
        tsconfigRootDir,
      },
    },
  },
])
