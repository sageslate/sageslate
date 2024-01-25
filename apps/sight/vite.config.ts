import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

const target = ['chrome119', 'edge119', 'safari17', 'firefox120', 'ios17']

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [vueRouter(), vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  build: {
    target,
  },
  optimizeDeps: {
    esbuildOptions: {
      target,
    },
  },
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
  },
})
