import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/lifepill/v1': {
        target: 'http://35.174.112.238:8079/lifepill/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lifepill\/v1/, ''),
      },
    },
  },
  plugins: [react()],
});
