import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
      open: true,
  },
  css: {
      preprocessorOptions: {
          scss: {
              silenceDeprecations: ['legacy-js-api'],
          },
      },
  },
})
