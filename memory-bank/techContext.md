# techContext.md — 技术栈与环境

## 技术栈
- Node v24 / npm 11(Windows,Git Bash)
- Vue 3 + Vite 5;vue-router@4;vue-i18n@9
- element-plus@2(按需:unplugin-vue-components + ElementPlusResolver)+ @element-plus/icons-vue
- flag-icons(MIT,国旗 SVG 素材包):**已卸载依赖,51 面所用旗帜 SVG 已复制入 `src/assets/flags/`**(仓库自持,import.meta.glob 按需加载);用于联系页区号自动匹配国旗(见 ERR-007,emoji 旗帜 Windows 不可用);区号数据表在 `src/data/dialCodes.js`
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
  - **Netlify Forms 联系表单**:index.html 内置隐藏影子表单(name=contact, data-netlify)供部署时注册;Contact.vue 以 fetch POST '/' + URLSearchParams(form-name=contact)提交;邮件通知在 Netlify 后台 Forms→Settings 配置(lukecao@ykautomus.com / lujiacao@163.com);**该功能仅 Netlify 生效,GitHub Pages 版提交会失败**(SPA 静态托管无表单后端)
  - **Netlify Forms 职位申请表单(含附件)**:index.html 影子表单 name=job(position/name/phone/email/message 隐藏字段 + `<input type="file" name="resume">`);Careers.vue 申请弹框以 FormData multipart 提交(fetch 不手动设 Content-Type,浏览器自带 boundary);简历限 pdf/doc/docx、≤10MB(Netlify 单次提交上限);**同样仅 Netlify 域名生效**
  - **vite base 环境自适应**:`process.env.NETLIFY ? '/' : '/yinkaish/'`——Netlify 构建环境自带 NETLIFY 变量取根路径,GitHub Pages 取子路径;改仓库名需同步改 /yinkaish/

## 命令
- dev:`npm run dev`;build:`npm run build`;preview:`npm run preview`
- PDF 图片提取:`node scripts/extract-pdf-images.cjs <pdf> <outdir>`(对象级,支持 Flate+DCT 过滤器链);页面-图片映射:`node scripts/map-pdf-images.cjs <pdf>`(裸 Page 对象序即阅读序)

## 后端与数据库(2026-09-29 新增)
- **MySQL 8.0.29**(本机 Windows,服务名 `mysql`,端口 3306,安装目录 D:\mysql-8.0.29-winx64);库 `yinkai_web` utf8mb4;表:news/jobs/product_categories/products/product_params/honors/partners(双语 `_zh/_en` 列,图片列存文件名);**发展历程(timeline/milestones)未入库(用户排除)**
- **server/** 目录:Express + mysql2 + dotenv + cors(ESM),只读 GET 接口(/api/news|jobs|products|honors|partners),端口 3001;`npm run setup` 执行建库+种子(scripts/setup-db.mjs);`npm start` 起服务
- **凭据**:server/.env(DB_PASSWORD 等,已 gitignore;模板 .env.example);**本机 mysql 客户端曾因 my.ini [client] 段 skip-grant-tables 全部不可用(已修,ERR-008)**
- **前端对接**:src/api/data.js 启动水合(2.5s 超时,失败保持 src/data 静态兜底);src/data 六个动态导出为 reactive;图片文件名→URL 映射在 src/data/assets.js;dev 代理 /api→localhost:3001(vite.config.js)
- **部署现状**:Netlify 仍是纯静态托管——线上站点走静态兜底数据,后端接口需自行部署(本地 3001 或服务器)后前端 /api 才能命中真实数据
