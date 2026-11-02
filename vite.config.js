import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // 站点根路径按部署目标取值:
  // - VPS/Nginx 整站部署:构建时传 VITE_DEPLOY=vps(deploy/update-server.sh 已带)。不用 VITE_BASE=/ 传路径:
  //   Git Bash(MSYS)会把以 / 开头的环境变量值转成 Windows 路径(/ → D:/Git/),产物资源路径全错(ERR-021)
  // - Netlify:构建环境自带 NETLIFY 变量,部署在根路径
  // - GitHub Pages 项目站:默认 /yinkaish/(https://20010811yu.github.io/yinkaish/)
  base: process.env.VITE_DEPLOY === 'vps' || process.env.NETLIFY ? '/' : '/yinkaish/',
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
  server: {
    proxy: {
      // 本地开发时后端接口代理(server 目录);/uploads 为上传图片的静态托管
      '/api': 'http://localhost:3001',
      '/uploads': 'http://localhost:3001',
    },
  },
})
