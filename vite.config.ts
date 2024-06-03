import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import pxtovw from 'postcss-px-to-viewport'


//配置参数
const usePxtovw = pxtovw({
  viewportWidth: 375,
  viewportUnit: 'vw'
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [usePxtovw]
    }
  }

})
