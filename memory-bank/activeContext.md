## 当前焦点(2026-09-30):管理端安全加固(已完成)
后端五层加固落地(security.js 集中管理):JWT_SECRET 生产强制、CORS 白名单(FRONTEND_ORIGIN)、三级限速(登录 5/15min、上传 30/15min、API 120/min)、helmet 安全头 + netlify.toml 前端安全头、CRUD 入库统一校验(类型/长度 400)+ content_zh sanitize-html 消毒(存储型 XSS)、密码策略 ≥8 位含字母数字。实测:403 跨源、429 限速、400 校验、script/onclick 消毒剥离全部生效;前端 build 通过。过程坑与数据恢复见 ERR-016/ERR-017。**存量默认口令 admin/admin123 未改,提醒用户首登改密**;上线 API 时须配置 NODE_ENV/JWT_SECRET/FRONTEND_ORIGIN 并走 HTTPS。
下一步(候选):后端部署到服务器/Serverless 让线上 /api 命中真实数据;外接 MySQL 或 Netlify Blobs 方案已调研。

## 上一焦点(2026-09-28,概要)
- 申请职位弹框(Careers):el-dialog+el-form,大陆手机号校验/简历附件必填(≤10MB),FormData 提交 Netlify Forms 影子表单 job
- 电话地区选择终态:el-select 51 国平铺(国旗 SVG+国名+区号)+filterable/allow-create,键入区号自动匹配国旗;细节测试注意见归档
- 国旗 emoji 改 SVG(ERR-007);新闻迷你日历标题放大;页脚高度×0.8

## 上一焦点(2026-09-28 前概要)
- 新闻页改版(置顶头条+3 列网格+分页+迷你日历,useReveal 翻页重扫 ERR-006)
- 首页服务与合作伙伴模块(20 家 logo 墙);Netlify 双平台部署(base 环境自适应+netlify.toml)
- 弹性布局全站改造(AGENTS.md v1.2 硬约束);大图 sharp 压缩(LQIP);YK-OL-2I 多图查看器
