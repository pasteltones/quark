/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/**', 'dist/**', 'examples/**', 'src/index.ts'],
    },
    globals: true,
    environment: 'jsdom',
  },
})
