import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/random_thoughts/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
})
