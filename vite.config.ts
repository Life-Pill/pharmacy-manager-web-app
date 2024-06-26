import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Choose a different port for your Vite frontend development server
    proxy: {
      '/lifepill/v1': {
        target: 'http://35.174.112.238', // Backend server running on port 8079
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lifepill\/v1/, '/lifepill/v1'),
      },
    },
  },
});
