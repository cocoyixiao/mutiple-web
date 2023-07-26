import { resolve, join, basename } from 'path'
import { fileURLToPath, URL } from 'node:url'
const fs = require('fs')
const createHtml = require('./config/pug-to-html.js')
createHtml()

var filePath = resolve('./html');
const getAllFile= (dir:any) =>{
  let res:any = {}
  const traverse = (dir:any) =>{
    fs.readdirSync(dir).forEach((file:any)=>{
      const pathname = join(dir, file)
      if(fs.statSync(pathname).isDirectory()){
        traverse(pathname)
      } else{
        const key = basename(pathname, '.html');
        // const relativePath = relative(__dirname, pathname)
        // res.push(relativePath)
        res[key] = pathname
      }
    })
  }
  traverse(dir)
  return res;
}

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
      input: getAllFile(filePath)
    }
  }
})
