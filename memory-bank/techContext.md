# techContext.md — 技术栈与环境

## 技术栈
- Node v24 / npm 11(Windows,Git Bash)
- Vue 3 + Vite 5;vue-router@4;vue-i18n@9
- element-plus@2(按需:unplugin-vue-components + ElementPlusResolver)+ @element-plus/icons-vue
- 样式:原生 CSS + design tokens,无预处理器;品牌素材(logo/轮播图)在 `src/assets/`
- **构建约束**:`vite.config.js` 已设 `build.minify:false`——esbuild 压缩在本项目会产生变量名冲突(页脚组件渲染丢失,见 errorlog ERR-001);产物约 641KB(gzip 150KB),官网可接受,勿随意改回
- **i18n 约束**:消息含 `@` 等保留字符需 `{'@'}` 转义(邮箱地址);main.js 的 app.config.errorHandler 用于生产排错

## 环境与工具约束
- 仓库:D:\yinkai_web,远程 git@github.com:20010811yu/yinkaish.git,分支 main
- 规则文件:仓库根 AGENTS.md(工作流 P0–P5 + 项目规范)
- 构建验证:`npm run build` 必须通过;本地验证 `npm run dev`
- **部署(双平台)**:
  - GitHub Pages:GitHub Actions(.github/workflows/deploy.yml)push main 自动构建并发布;站点 https://20010811yu.github.io/yinkaish/ ;SPA 深链靠 dist/404.html 回退(workflow 中 cp)
  - Netlify:Git 连接持续部署(main),站点 https://yinkai.netlify.app ;netlify.toml 定义 build(npm run build)/publish(dist)/SPA 通配 redirect 200
  - **vite base 环境自适应**:`process.env.NETLIFY ? '/' : '/yinkaish/'`——Netlify 构建环境自带 NETLIFY 变量取根路径,GitHub Pages 取子路径;改仓库名需同步改 /yinkaish/

## 命令
- dev:`npm run dev`;build:`npm run build`;preview:`npm run preview`
- PDF 图片提取:`node scripts/extract-pdf-images.cjs <pdf> <outdir>`(对象级,支持 Flate+DCT 过滤器链);页面-图片映射:`node scripts/map-pdf-images.cjs <pdf>`(裸 Page 对象序即阅读序)
