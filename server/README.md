# yinkai_web 后端接口服务

Express + mysql2 只读内容接口，为官网提供新闻/职位/产品/荣誉/伙伴数据。

## 首次部署

1. 准备 MySQL 8.0+；复制 `.env.example` 为 `.env` 并填入 `DB_PASSWORD`，然后一条命令建库+灌种子数据：
   ```bash
   npm install
   npm run setup
   ```
   （等效于手工执行 `mysql -uroot -p < sql/schema.sql` 与 `sql/seed.sql`）
2. 复制 `.env.example` 为 `.env`，填入数据库密码等连接信息
3. `npm install && npm start`（默认 3001 端口）

## 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/health | 健康检查 |
| GET | /api/news | 新闻（date 倒序，双语字段 zh/en） |
| GET | /api/jobs | 在招职位 |
| GET | /api/products | 产品分类→产品→参数（嵌套；image 为素材文件名） |
| GET | /api/honors | 公司荣誉 |
| GET | /api/partners | 合作伙伴 |

## 前端对接

- 开发：`vite.config.js` 已配置 `/api` 代理到 `http://localhost:3001`
- 前端启动时 `src/api/data.js` 拉取各接口并原位替换 `src/data/index.js` 的 reactive 数组；接口不可用时自动保留静态兜底数据，站点功能不受影响
- 数据库图片列只存文件名（如 `yk-6a_banner.png`），由 `src/data/assets.js` 的 glob 映射解析为打包后 URL

## 管理员端(/admin)

- 访问 `/admin`(如 http://localhost:5174/yinkaish/admin/login),默认账号 `admin` / `admin123`,**首次登录请立即在右上角「修改密码」改密**
- 管理范围:新闻(增删改+发布/下架)、职位(增删改+在招/停招)、产品(分类/产品/参数三级维护)、荣誉、合作伙伴
- 登录态为 JWT(12h),存储在浏览器 localStorage;多账号可向 admins 表插入新行(密码用 bcrypt 哈希)
- 图片字段从现有素材文件名中选择(由前端资源映射解析为实际 URL);新增素材需放入 src/assets 对应目录
- 迁移命令:`npm run migrate`(建 admins 表+默认账号,幂等)
