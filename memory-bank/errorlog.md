# errorlog.md — 问题与解决的唯一事实来源

## 错误条目

### ERR-001 页脚生产环境渲染丢失(vue-i18n 邮箱 @ 符号解析错误)
- **错误现象**:生产构建页面页脚完全不渲染(DOM 中为空注释节点),dev 模式正常;无肉眼可见报错
- **发生上下文**:导航/页脚文案调整任务验证时发现;此前长期存在但页面截图均未覆盖页脚,一直未察觉
- **发生时间**:2026-09-17
- **根本原因**:i18n 消息 `contact.email` 值含邮箱 `caolujia@yinkaish.cn`,vue-i18n 运行时编译器把 `@` 解析为链接消息(linked message)语法,抛出 "Invalid linked format";页脚渲染该消息时抛错,Vue 生产模式将渲染失败的组件静默渲染为注释节点
- **解决方式**:消息中 `@` 用字面量插值转义为 `{'@'}`(即 `caolujia{'@'}yinkaish.cn`);同时在 main.js 增加 `app.config.errorHandler` 把渲染错误存到 `window.__renderErr` 便于排查;构建改为 `minify:false`(排查中发现 esbuild 压缩产物存在变量名冲突异常,一并规避)
- **解决时间**:2026-09-17
- **验证结果**:build 后页脚正常渲染,`window.__renderErr` 为空
- **教训**:vue-i18n 消息中的 `@`、`{`、`}`、`|`、`$` 是保留语法字符,写入邮箱等含 `@` 文案必须转义;生产渲染失败是静默的,必须有全局 errorHandler
- **状态**:🟢 已解决

### ERR-002 荣誉相册 375px 横向溢出 386px(1fr 网格轨道被 min-content 撑破)
- **错误现象**:375px 视口下 About 页横向滚动 386px,`.gallery__viewer` 及整个相册区被撑到 721px 宽;桌面/平板宽度不明显
- **发生上下文**:全站弹性布局改造的四档宽度(1280/1024/768/375)×8 页面 scrollWidth 普查中发现
- **发生时间**:2026-09-18
- **根本原因**:`.gallery` 单列 `1fr` 轨道实际是 `minmax(auto, 1fr)`,最小尺寸为内容 min-content;1024 断点下 `.gallery__thumbs` 变横向 flex 且 `.gallery__thumb` 设了 `flex-shrink: 0`(7×90px+gap≈702px),该 min-content 沿 `.gallery__side`(网格项,overflow visible)传导,把轨道撑到 721px
- **解决方式**:`.gallery__side` 与 `.gallery__viewer` 加 `min-width: 0` 打断 min-content 传导,缩略图行由自身 `overflow-x: auto` 滚动
- **解决时间**:2026-09-18
- **验证结果**:四档宽度 × 8 页面 scrollWidth==clientWidth,零溢出
- **教训**:给网格项写 `min-width: 0` 是弹性布局标配;含 flex-shrink:0 子元素的横滚容器必须保证祖先轨道可收缩;弹性验收必须做小宽度(≤375)普测,桌面正常≠小屏不破
- **状态**:🟢 已解决

## 防回归清单(编码前必查)
1. Element Plus 禁全量引入(`app.use(ElementPlus)` + 全量样式),必须 resolver 按需;ElMessage 等函数式组件需单独引入样式
2. 文案禁止硬编码,必须入 i18n zh/en 双包;新增 key 中英同步
3. Element Plus locale 必须跟随 vue-i18n locale 切换
4. 模板中 Element Plus 组件统一 kebab-case
5. 使用图标需引入 @element-plus/icons-vue,数据中的图标名对应其组件
6. **i18n 消息含 `@`/`{`/`}`/`|`/`$` 必须用 `{'字符'}` 转义**(尤其邮箱),否则生产运行时解析报错、组件渲染丢失(见 ERR-001)
7. 全局 errorHandler(main.js)不得移除,渲染失败靠 window.__renderErr 排查
8. **弹性布局遵循 AGENTS.md §11**:容器 max-width、列宽 fr/minmax、大尺寸 clamp();网格项视需要加 `min-width: 0`(见 ERR-002);改样式后在 1280/1024/768/375 四档宽度自查无横向滚动条
