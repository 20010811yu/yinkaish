import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // GitHub Pages 项目站路径(https://20010811yu.github.io/yinkaish/);Netlify 构建环境自带 NETLIFY 环境变量,部署在根路径
  base: process.env.NETLIFY ? '/' : '/yinkaish/',
  build: {
    // 规避 esbuild 压缩导致的变量名冲突(页脚组件渲染丢失)
    minify: false,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
