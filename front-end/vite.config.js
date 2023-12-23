import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/ugurv1/api': {
        target: 'http://localhost:7500',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ugurv1\/api/, ''),
      },
    },
  },
});
