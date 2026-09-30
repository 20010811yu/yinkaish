# 管理端 + 后端只做中文版

## 1. 数据库（server/sql/）
- schema.sql：7 张内容表删除全部 `_en` 列，表注释标「仅中文」
- seed.sql：INSERT 改为仅中文列
- 线上库用 `ALTER TABLE ... DROP COLUMN` 逐列删 `_en`，**不动 admins 表**（保留你已修改的管理员密码）

## 2. 后端接口（server/src/routes/）
- 公开 news/jobs/products/content：响应双语字段只含 `{ zh }`（前端 pick() 英文时自动回退中文）
- 管理接口 admin/content.js：白名单/SELECT/参数保存全部去 `_en` 字段

## 3. 管理端界面（src/views/admin/）——只做中文版
- AdminLogin / AdminLayout / AdminNews / AdminJobs / AdminProducts / AdminHonors / AdminPartners / SlideVerify：界面文案从 `$t('admin.*')` 改为直接写中文（不再跟随官网中英切换）；删除全部英文输入框（title_en/name_en/tag_en/value_en…），校验仅必填中文
- i18n 中 admin.* 双语键移除（界面不再引用）

## 4. 前台官网
- 不动：静态文案仍双语；库驱动内容在英文语言下由 pick() 回退显示中文

## 5. 验证与收尾
- ALTER 后重启后端；curl 验证登录（admin/你的密码）、/api/news、/api/products 返回仅中文结构；若登录仍失败（MySQL 服务可能仍未启动）会提示你
- `npm run build`；progress/techContext 记录「管理端+后端仅中文」约束；git 提交推送