import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', '!src/examples/**'],
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  treeshake: true,
  minify: true,
  ignoreWatch: [
    'coverage',
    'package-lock.json',
    'examples',
    '*.test.*',
    '*.spec.*',
    'test',
    '*.md',
  ],
})
