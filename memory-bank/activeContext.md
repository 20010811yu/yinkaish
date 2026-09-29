## 当前焦点(2026-09-29):管理员端(/admin)
官网管理员端已交付:admins 表+JWT 多账号登录(默认 admin/admin123,提醒首登改密);后端 /api/admin/* 鉴权 CRUD(新闻/职位/产品分类/产品/参数/荣誉/伙伴);前端 /admin 独立布局+五个管理页(Element Plus,admin.* 双语文案);图片字段下拉选现有素材文件名。实测:401 拦截、登录、新闻 UI 增删、参数组保存、前台即时可见。**注意:news/jobs 主键非自增,后端新增时自动 MAX(id)+1;管理列表 news_date 用 DATE_FORMAT**。暂无图片上传(素材文件名机制),后续可扩展。
## 上一焦点(2026-09-29):MySQL 数据库 + 后端内容接口(已完成)
用户要求把动态内容数据迁入 MySQL。方案已定并实施:
- **数据库 yinkai_web**(utf8mb4):6 组表——news / jobs / product_categories / products(gallery JSON) / product_params / honors / partners;双语列 `_zh/_en` 后缀;图片列只存文件名。**不含发展历程(用户明确排除)**
- **后端 server/**:Express + mysql2 + dotenv + cors,ESM;只读 GET /api/news|jobs|products|honors|partners(/api/health);端口 3001;`server/.env` 存连接信息(已 gitignore,模板 .env.example)
- **SQL 脚本**:server/sql/schema.sql(DDL)+ seed.sql(现有静态数据全量种子);一键建库 `cd server && npm run setup`(scripts/setup-db.mjs)
- **前端接入(保留静态兜底)**:src/data/index.js 六个动态导出改 reactive;新增 src/api/data.js(2.5s 超时,fetch 成功后 splice 原位替换,失败保持静态);main.js 启动调用 hydrateAll;vite.config.js 加 /api 代理 → localhost:3001;新增 src/data/assets.js(glob 文件名→打包 URL 映射,数据文件与 API 图片解析共用)
- **状态**:✅ 建库建表+种子数据已执行完成(npm run setup:news 12/jobs 6/products 13/params 149/honors 7/partners 20);5 个接口 curl 实测 200,中文 UTF-8 存取正确;浏览器冒烟测试首页/新闻/业务/加入我们/关于五页渲染无错、无横向溢出、水合成功。修复 /api/products 的 JSON 列二次解析报错(mysql2 已自动 parse gallery)
 - 环境修复:D:\mysql-8.0.29-winx64\my.ini [client] 段误写 skip-grant-tables 致 mysql 客户端全部无法启动,已删除该行(ERR-008)

## 上一焦点(2026-09-28,概要)
- 申请职位弹框(Careers):el-dialog+el-form,大陆手机号校验/简历附件必填(≤10MB),FormData 提交 Netlify Forms 影子表单 job
- 电话地区选择终态:el-select 51 国平铺(国旗 SVG+国名+区号)+filterable/allow-create,键入区号自动匹配国旗;细节测试注意见归档
- 国旗 emoji 改 SVG(ERR-007);新闻迷你日历标题放大;页脚高度×0.8

## 上一焦点(2026-09-28 前概要)
- 新闻页改版(置顶头条+3 列网格+分页+迷你日历,useReveal 翻页重扫 ERR-006)
- 首页服务与合作伙伴模块(20 家 logo 墙);Netlify 双平台部署(base 环境自适应+netlify.toml)
- 弹性布局全站改造(AGENTS.md v1.2 硬约束);大图 sharp 压缩(LQIP);YK-OL-2I 多图查看器
