import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      stylus: {
        // 一些配置项
        // additionalData: '@import "@/assets/css/pages/about.styl"',
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@assets": resolve(__dirname, './src/assets'),
      // 指定@符的路径，比如 import xx from '@component/index.vue'
      "@component": resolve(__dirname, './src/component')
    }
  },
  build: {
    rollupOptions: {
      input: {
        about: resolve(__dirname, './html/about.html'),
        discovery: resolve(__dirname, './html/discovery.html')
      }
    }
  }
})
