import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/david-alves-visagismo-masculino/',
  plugins: [react()],
  build: { target: 'es2020' },
});
