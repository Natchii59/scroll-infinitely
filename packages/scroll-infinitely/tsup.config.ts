import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  external: ['react'],
  outDir: 'dist',
  ...options
}))
