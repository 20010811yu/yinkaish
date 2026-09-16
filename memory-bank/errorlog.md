# errorlog.md — 问题与解决的唯一事实来源

## 错误条目
- (暂无)

## 防回归清单(编码前必查)
1. Element Plus 禁全量引入(`app.use(ElementPlus)` + 全量样式),必须 resolver 按需;ElMessage 等函数式组件需单独引入样式
2. 文案禁止硬编码,必须入 i18n zh/en 双包;新增 key 中英同步
3. Element Plus locale 必须跟随 vue-i18n locale 切换
4. 模板中 Element Plus 组件统一 kebab-case
