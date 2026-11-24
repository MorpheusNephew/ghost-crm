import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': process.env.VITE_CRM_API_PROXY_TARGET ?? 'http://localhost:3000',
      '/openapi.json': process.env.VITE_CRM_API_PROXY_TARGET ?? 'http://localhost:3000',
      '/otel': {
        rewrite: (path) => path.replace(/^\/otel/, ''),
        target: process.env.VITE_OTEL_COLLECTOR_PROXY_TARGET ?? 'http://localhost:4318',
      },
    },
  },
  test: {
    coverage: {
      include: ['src/components/events/**/*.tsx', 'src/hooks/**/*.ts', 'src/utilities/**/*.ts'],
      provider: 'v8',
      thresholds: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
});
