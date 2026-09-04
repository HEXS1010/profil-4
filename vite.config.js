import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/uploads": "http://localhost:3000",
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        about: fileURLToPath(new URL('./about-me.html', import.meta.url)),
        dashboard: fileURLToPath(new URL('./dashboard.html', import.meta.url)),
        message: fileURLToPath(new URL('./message.html', import.meta.url)),
        detail: fileURLToPath(new URL('./project-detail.html', import.meta.url)),
        project: fileURLToPath(new URL('./project.html', import.meta.url)),
      },
    },
  },
})
