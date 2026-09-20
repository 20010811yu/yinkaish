import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // GitHub Pages 项目站路径(https://20010811yu.github.io/yinkaish/)
  base: '/yinkaish/',
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
