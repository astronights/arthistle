import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})