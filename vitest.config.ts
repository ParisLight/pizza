import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { buildViteConfig } from './src/app/config/build'

export default defineConfig((env) =>
  mergeConfig(
    buildViteConfig(env),
    {
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        css: true,
        server: {
          deps: {
            inline: [/element-plus/],
          },
        },
      },
    },
  ),
)
