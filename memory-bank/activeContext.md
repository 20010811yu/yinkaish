## 当前焦点(2026-11-02):整站 VPS+Nginx 部署物料与代码适配(已完成)
结果:用户选定方案一(整站部署海外 VPS)。
- 后端:index.js `trust proxy 1`;新增 server/src/routes/forms.js——POST /api/contact(JSON)、/api/apply(multipart 简历附件,multer 内存态 + `defParamCharset:'utf8'`),nodemailer@10 经 SMTP 发到 MAIL_TO,formLimiter 10 次/15min 两路由共享;SMTP 未配置 503;.env.example 补 SMTP_*/MAIL_FROM/MAIL_TO
- 前端:vite base 改 `VITE_DEPLOY==='vps' || NETLIFY ? '/' : '/yinkaish/'`;src/api/forms.js 双通道(先后端 JSON 应答为准,否则回退 Netlify 影子表单),Contact/Careers 接入,Contact 按钮加 loading
- 物料:deploy/nginx.conf(占位 __DOMAIN__)、deploy/update-server.sh、deploy/README.md(初始化/迁移/pm2/Nginx/certbot/验收/发版/备份/排障/三平台对照)、server/ecosystem.config.cjs、.gitattributes(sh/conf 强制 LF)、server/README 补接口与部署章节
- 验证:`VITE_DEPLOY=vps` 与默认两种 build 通过且资源前缀分别为 `/assets/`、`/yinkaish/assets/`;后端冒烟 8 项全符合预期(health 200 / 校验 400 / 无 SMTP 503 / txt 附件被拒 / pdf 进入发送链 / 第 11 次 429);中文文件名 utf8 对照验证通过
- 过程错误:ERR-021(Git Bash 把 `VITE_BASE=/` 转成 `D:/Git/`,改枚举 token 解决)已入档并加防回归 #16/#17
下一步(用户侧,按 deploy/README.md):购买 Ubuntu VPS + 域名 A 记录 → 初始化/装环境 → mysqldump utf8mb4 迁移库与 server/uploads → 填 server/.env(JWT_SECRET/FRONTEND_ORIGIN/SMTP) → `bash deploy/update-server.sh` → Nginx 模板 + certbot → 验收清单(含立即改 admin 默认密码)。上机后若有问题按 README §6 排障对照表处理;Netlify/GitHub Pages 线上行为不变。

## 上一焦点(2026-11-02,概要)
- 首页伙伴墙 20 个 logo 全裂修复(ERR-020):partnerImgs 短键 pN 与 assets.js 映射键 pN.png 失配,被后端水合掩盖;index.js 重建短键映射,preview 静态路径实测 20/20 正常

## 上一焦点(2026-10-23,概要)
- 英文界面动态内容回退中文修复(ERR-019):水合 withEn 按业务键从静态双语种子合并 en 回 API 行,五模块生效;遗留=管理端新增无种子翻译的内容英文下回退中文,需补 src/data 种子
