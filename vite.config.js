import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Hybrid base: GitHub Pages serves at /InfoSecure/ subpath, VPS/Caddy at root /
  // GITHUB_ACTIONS is set in the deploy workflow — use subpath there, root otherwise
  base: process.env.GITHUB_ACTIONS ? '/InfoSecure/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
        }
      }
    }
  }
}))
