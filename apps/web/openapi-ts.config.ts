import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../../services/crm/openapi.json',
  output: 'src/api/generated',
  plugins: ['@hey-api/client-fetch', '@tanstack/react-query'],
});
