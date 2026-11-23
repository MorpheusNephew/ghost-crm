import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/server.ts', 'src/openapi/generate.ts'],
      include: ['src/**/*.ts'],
      provider: 'v8',
      thresholds: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'node',
  },
});
