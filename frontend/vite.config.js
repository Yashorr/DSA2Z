import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // Set root to current directory (frontend)
  root: path.resolve(__dirname),
  
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Exclude backend dependencies that might be scanned
      external: [
        '@prisma/client',
        'bcryptjs',
        'jsonwebtoken',
        'express',
        'cors',
        'dotenv',
        'prisma'
      ]
    }
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Prevent Vite from scanning backend files
  optimizeDeps: {
    exclude: ['@prisma/client']
  },
  
  server: {
    historyApiFallback: true,
    fs: {
      // Restrict file system access to frontend only
      allow: [path.resolve(__dirname)]
    }
  }
})