# 管理端登录页标题改为公司 logo + 名称

1. 修改 `src/views/admin/AdminLogin.vue`：登录卡顶部加品牌区——logo（复用官网导航的 `src/assets/logo.png`）+ 公司全称（`brand.full`，中英随语言），保留原「官网内容管理」作为下方小标题
2. 样式：logo 与公司名同行居中，公司名用与官网一致的品牌色/字号，移动端不破版
3. 浏览器验证登录页显示效果，`npm run build` 通过
4. git 提交推送