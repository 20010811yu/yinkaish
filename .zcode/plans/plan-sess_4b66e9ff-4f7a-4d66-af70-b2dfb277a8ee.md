# 修复管理端无法登录

## 1. 修复 api/admin.js 的 401 跳转 bug（代码缺陷）
- 现状：`location.pathname.startsWith('/admin/login')` 在 base=`/yinkaish/` 下永不匹配 → 密码错一次就整页跳到脱离 base 的 `/admin/login`
- 修复：用 `import.meta.env.BASE_URL` 拼接登录页路径判断（`/yinkaish/admin/login`），跳转也用 BASE_URL 前缀

## 2. 启动后端并验证
- `cd server && npm start`（后台），确认 3001 监听、`/api/health` 返回 ok
- 若后端启动报数据库连接错误：按 .env 的 DB_PORT 排查 MySQL 服务（netstat 查实际端口/sc query mysql）

## 3. 端到端验证
- curl 实测 POST /api/admin/login（admin/admin123）：200 返回 token；若 401 说明密码已被修改，再与你确认是否重置
- 浏览器实测：登录页滑块→登录→进入 /admin/news；密码错误场景不再整页跳走，只弹错误提示

## 4. 收尾
- `npm run build` 验证；git 提交推送
- 记忆库：errorlog 记录 401 跳转路径 bug（ERR-010），techContext 补一句