import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8079,
    proxy: {
      '/lifepill/v1': {
        target: 'http://35.174.112.238',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/lifepill\/v1/, ''),
      },
    },
  },
});
