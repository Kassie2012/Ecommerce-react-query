import { defineConfig } from 'vitest/config'

// Minimal, explicit Vitest configuration so tests run the same locally and in CI.
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    globals: true,
  },
})
