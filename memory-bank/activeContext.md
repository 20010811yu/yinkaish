# activeContext.md — 当前上下文

## 当前焦点(2026-09-29):MySQL 数据库 + 后端内容接口
用户要求把动态内容数据迁入 MySQL。方案已定并实施:
- **数据库 yinkai_web**(utf8mb4):6 组表——news / jobs / product_categories / products(gallery JSON) / product_params / honors / partners;双语列 `_zh/_en` 后缀;图片列只存文件名。**不含发展历程(用户明确排除)**
- **后端 server/**:Express + mysql2 + dotenv + cors,ESM;只读 GET /api/news|jobs|products|honors|partners(/api/health);端口 3001;`server/.env` 存连接信息(已 gitignore,模板 .env.example)
- **SQL 脚本**:server/sql/schema.sql(DDL)+ seed.sql(现有静态数据全量种子);一键建库 `cd server && npm run setup`(scripts/setup-db.mjs)
- **前端接入(保留静态兜底)**:src/data/index.js 六个动态导出改 reactive;新增 src/api/data.js(2.5s 超时,fetch 成功后 splice 原位替换,失败保持静态);main.js 启动调用 hydrateAll;vite.config.js 加 /api 代理 → localhost:3001;新增 src/data/assets.js(glob 文件名→打包 URL 映射,数据文件与 API 图片解析共用)
- **状态**:代码全部完成,`npm run build` 通过;**建库执行被阻塞——MySQL root 密码两次询问均未送达(AskUserQuestion 的 Other 文本未传回),等用户提供密码或自行执行 `npm run setup`**
- 环境修复:D:\mysql-8.0.29-winx64\my.ini [client] 段误写 skip-grant-tables 致 mysql 客户端全部无法启动,已删除该行(ERR-008)

## 上一焦点(2026-09-28,概要)
- 申请职位弹框(Careers):el-dialog+el-form,大陆手机号校验/简历附件必填(≤10MB),FormData 提交 Netlify Forms 影子表单 job
- 电话地区选择终态:el-select 51 国平铺(国旗 SVG+国名+区号)+filterable/allow-create,键入区号自动匹配国旗;细节测试注意见归档
- 国旗 emoji 改 SVG(ERR-007);新闻迷你日历标题放大;页脚高度×0.8

## 上一焦点(2026-09-28 前概要)
- 新闻页改版(置顶头条+3 列网格+分页+迷你日历,useReveal 翻页重扫 ERR-006)
- 首页服务与合作伙伴模块(20 家 logo 墙);Netlify 双平台部署(base 环境自适应+netlify.toml)
- 弹性布局全站改造(AGENTS.md v1.2 硬约束);大图 sharp 压缩(LQIP);YK-OL-2I 多图查看器
