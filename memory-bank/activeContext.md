# activeContext.md — 当前上下文

## 当前焦点(2026-09-16)
首期初始化已完成:按 AGENTS.md 从零搭建"银凯科技"双语企业官网,build 通过,桌面/移动端预览验证通过。

## 最近变更
- 建立 Vue3+Vite+Element Plus(按需)项目;8 个页面 + Navbar/Footer/NewsCard;i18n zh/en 完整;design tokens;src/data 占位数据
- 验证:npm run build 通过;浏览器抽查首页、新闻详情、语言切换(localStorage 持久化)、375px 移动端布局均正常

## 下一步
- 真实内容替换(品牌名、文案、数据);如需部署可配置 GitHub Pages(base 路径)

## 决策与考量
- 主色 #1e6fff;ElMessage 样式手动按需引入;NewsDetail `/news/:id`;表单校验 name/email/message 必填
