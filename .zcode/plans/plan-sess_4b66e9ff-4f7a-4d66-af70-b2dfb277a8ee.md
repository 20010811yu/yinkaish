# 为 yinkai_web 新建 MySQL 数据库 + 后端接口

## 环境结论（已探查）
- MySQL 8.0.29 服务（服务名 `mysql`）运行中，端口 3306；root 有密码（执行开始时向你索取，仅写入 `.env`，.env 加入 .gitignore）
- `D:\mysql-8.0.29-winx64\my.ini` `[client]` 段误写的 `skip-grant-tables` 需删除（已获你同意），否则 mysql 客户端无法使用
- Node v24 / npm 11 可用；项目为纯前端（Netlify 部署），无 server 目录

## 一、数据库 `yinkai_web`（utf8mb4）

新建 `server/sql/schema.sql`（DDL）+ `server/sql/seed.sql`（种子数据 = 现有 `src/data/index.js` 内容），并直接执行建库。不含发展历程（按你的要求），共 6 组表（均含 sort、时间戳字段）：

1. `news` — tag/date/title/summary/content 各分 `_zh`/`_en` 列
2. `jobs` — title/dept/location/desc 分 `_zh`/`_en`，加 `is_active`
3. `product_categories` — slug/name/desc 双语
4. `products` — category_id 外键、model、tag/desc 双语、image 路径、`gallery` JSON（YK-OL-2I 多图）
5. `product_params` — product_id 外键、label/value 双语、sort（对应现有 productParams）
6. `honors`、`partners` — name/desc 双语、image 路径

## 二、后端 `server/`（新建，Express + mysql2 + dotenv，ESM）

- `server/src/db.js` 连接池、`server/src/routes/`（news/jobs/products/honors/partners）
- 只读 GET 接口：`/api/news`、`/api/jobs`、`/api/products`（嵌套分类→产品→参数）、`/api/honors`、`/api/partners`
- CORS + 3001 端口；`server/package.json`（`npm run start`）；`.env` 存 DB 凭据

## 三、前端接入（保留静态兜底）

- 新建 `src/api/data.js`：请求各接口，失败时回退 `src/data/index.js` 静态数据（Netlify 纯静态部署下站点仍完整可用）
- 消费方改造：News/NewsDetail、Careers、Products、About（honors）、Home（partners）改为先取 API 数据
- `vite.config.js` 加 dev 代理 `/api → http://localhost:3001`

## 四、收尾（按 AGENTS.md）

- `npm run build` 验证；四档视口不涉及样式改动
- 记忆库同步（activeContext/progress/techContext/errorlog 如有坑）；P5 自动 add/commit/push，附提交哈希

## 执行顺序
1. 修 my.ini（删一行）→ 向你索取 MySQL 密码
2. 执行 schema.sql + seed.sql 建库灌数据并验证
3. 写后端并启动自测各接口
4. 改前端 + build 验证
5. 记忆库同步 + git 提交推送