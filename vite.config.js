import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'https://ggscore.net/api/v2/matches',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
