import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['medFavicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Meddlr',
        short_name: 'Meddlr',
        description: 'Tool to build medal set for OPBR',
        theme_color: '#173B45',
        background_color: '#282828',
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  },
  base: "/opbr-meddlr",
  build: {
    outDir:"dist",
  }
})
