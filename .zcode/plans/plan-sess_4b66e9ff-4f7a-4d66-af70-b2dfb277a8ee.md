# 官网管理员端（/admin，同项目路由 + 后端鉴权 CRUD）

## 一、数据库（server/sql 追加 migrations 文件 + 执行）
- `admins` 表：id / username(唯一) / password_hash(bcrypt) / nickname / is_active / created_at / updated_at；种子内置一个管理员 `admin`（初始密码 `admin123`，bcrypt 加密存储，README 提醒首次登录改密）
- 其余 6 组表沿用现有结构，不改动

## 二、后端 server/（新增依赖 jsonwebtoken + bcryptjs）
- `POST /api/admin/login`：用户名密码登录，签发 JWT（有效期 12h）；`GET /api/admin/me` 校验 token
- 鉴权中间件 `requireAdmin`：校验 JWT + is_active，保护全部管理接口
- 管理 CRUD 接口（全部挂 /api/admin 下）：
  - `news`、`jobs`、`honors`、`partners`：列表(含未发布)+新建+编辑+删除
  - `product-categories`：分类增删改；`products`：产品增删改（含 gallery JSON）；`products/:id/params`：参数行批量保存（整组替换）
- 公开 GET /api/* 接口保持不变（官网前台继续只读）

## 三、前端 /admin（同项目，懒加载独立分包，复用 Element Plus）
- 新增 `src/views/admin/`：`AdminLogin.vue`、`AdminLayout.vue`（左侧菜单+顶栏，el-container/el-menu）、`AdminNews.vue`、`AdminJobs.vue`、`AdminProducts.vue`（分类/产品/参数三级管理）、`AdminHonors.vue`、`AdminPartners.vue`
- `src/api/admin.js`：fetch 封装（自动带 Authorization: Bearer，401 跳登录）
- 路由：/admin/login、/admin 及子页（全部懒加载）；路由守卫查 localStorage token，无 token 重定向登录页；admin 路由不进 Navbar 公共导航
- 图片字段：下拉选择现有素材文件名（数据来自现有 assets 映射）+ 实时预览；暂不做上传（素材文件名映射机制决定，后续可加上传接口）
- 双语编辑：表单里中/英两列并排输入，i18n 管理页界面文案照规范入 zh/en 语言包

## 四、验证
- 重跑 setup 建 admins 表；启动接口，curl 验证：未带 token 访问管理接口 401、登录拿 token、带 token 增删改新闻成功、官网 /api/news 能看到变化
- 浏览器实测 /admin 登录→新闻增改→前台新闻页展示
- `npm run build` 通过

## 五、收尾
- README 补管理员端使用说明（默认账号、改密提醒）
- 记忆库同步（techContext/activeContext/progress，errorlog 视情况）；git 提交推送