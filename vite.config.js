import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  },
  base: "/opbr-meddlr",
  build: {
    outDir:"dist",
  }
})
