# errorlog.md — 问题与解决的唯一事实来源

> 🟢 已解决条目压缩为一行摘要(§4.1),完整版在 `archive/history-2026-09-errorlog.md`;🔴🟡 条目与防回归清单保留完整版。

## 错误条目

### ERR-010 管理端密码错误一次即整页跳转白屏(401 处理未含站点 base)
- **错误现象**:管理端登录时密码输错一次,页面整页跳转到脱离 base 的 /admin/login 白屏,而非仅弹错误提示
- **发生上下文**:排查"无法正常登录"时由 Explore 代理核实 src/api/admin.js 发现(2026-09-30)
- **根本原因**:401 处理用 location.pathname.startsWith('/admin/login') 判断是否已在登录页,但站点 base 为 /yinkaish/(vite base + GH Pages),实际 pathname 是 /yinkaish/admin/login,永不匹配;任何 401 都会 location.href 跳到脱离 base 的路径
- **解决方式**:改用 import.meta.env.BASE_URL 拼接 LOGIN_PATH 判断与跳转(api/admin.js)
- **验证结果**:npm run build 通过;待后端恢复后浏览器复核(2026-09-30 浏览器实测登录链路正常)
- **教训**:涉及 location.pathname 的判断必须考虑站点 base,统一用 import.meta.env.BASE_URL 拼接
- **状态**:🟡 规避中(待复测错误密码分支后转🟢)

## 🟢 已解决(一行摘要,详情见 archive/history-2026-09-errorlog.md)
- **ERR-001** 页脚生产渲染丢失:vue-i18n 消息含 `@` 必须转义 `{'@'}`,生产渲染失败是静默的,须有全局 errorHandler
- **ERR-002** 荣誉相册 375px 横向溢出:网格项加 `min-width: 0` 防 min-content 撑破轨道,弹性验收必做 ≤375 普测
- **ERR-003** 导航 1280px 溢出 7px:布局间距禁用 100vw(含滚动条宽),用 % / clamp
- **ERR-004** 世界地图标记全错位:坐标类定位禁止目测,必须由数据源计算;容器比例须与素材一致(该功能后已移除)
- **ERR-005** 刷新首页骨架闪现:大图压缩+LQIP、主落地页路由静态导入、scrollRestoration=manual
- **ERR-006** 新闻翻页第二页空白:v-for 动态重渲染后必须调用 useReveal 的 rescan()
- **ERR-007** Windows 国旗 emoji 不显示:国旗一律用 SVG 图片(flag-icons),禁用 emoji 旗帜
- **ERR-008** mysql 客户端全不可用:my.ini 各段选项有归属,服务端选项误入 [client] 段会瘫痪所有客户端
- **ERR-009** 滑块缺口不显示:canvas 传 NaN 坐标静默失败,ref 重构后须全局 grep .value 使用点,视觉验证要像素采样
- **ERR-011** 富文本编辑器两处样式坑:第三方组件内联 height:100% 时要在父容器定高;全局 reset(list-style:none)会波及 v-html 富文本,需 `list-style: revert` 恢复
- **ERR-012** 刷新 /admin 页闪现官网导航/页脚:main.js 先挂载后路由解析,首帧 route.path 为 '/' → isAdmin 误判;`router.isReady().then(() => app.mount())` 后挂载即正确(2026-09-30,详情见 archive)
- **ERR-013** 删除确认框(ElMessageBox)无样式缩在左上角+按钮英文:函数式组件样式未显式引入(main.js 补 message/message-box css);EP 内置文案未接 locale(App.vue 加 el-config-provider 跟随 i18n)(2026-09-30,详情见 archive)
- **ERR-014** YK-6A 参数变乱码:控制台内联中文发 PUT 被编码污染覆盖库数据;恢复须从 seed.sql 提取行生成带引号 SQL 文件走 mysql --default-character-set=utf8mb4,中文写库禁走控制台内联(2026-09-30,详情见 archive)
- **ERR-015** 上传 logo 在首页伙伴墙不显示:img width/height auto 时未加载 intrinsic 为 0 → 0×0 元素被 loading=lazy 判定无可视区永不加载(死锁);修法=img 用 CSS 占满定尺寸容器(100%/100%+contain)(2026-09-30,详情见 archive)

## 防回归清单(编码前必查)
1. Element Plus 禁全量引入(`app.use(ElementPlus)` + 全量样式),必须 resolver 按需;ElMessage 等函数式组件需单独引入样式
2. 文案禁止硬编码,必须入 i18n zh/en 双包;新增 key 中英同步
3. Element Plus locale 必须跟随 vue-i18n locale 切换
4. 模板中 Element Plus 组件统一 kebab-case
5. 使用图标需引入 @element-plus/icons-vue,数据中的图标名对应其组件
6. **i18n 消息含 `@`/`{`/`}`/`|`/`$` 必须用 `{'字符'}` 转义**(尤其邮箱),否则生产运行时解析报错、组件渲染丢失(见 ERR-001)
7. 全局 errorHandler(main.js)不得移除,渲染失败靠 window.__renderErr 排查
8. **弹性布局遵循 AGENTS.md §11**:容器 max-width、列宽 fr/minmax、大尺寸 clamp();网格项视需要加 `min-width: 0`(见 ERR-002);改样式后在 1280/1024/768/375 四档宽度自查无横向滚动条
9. **布局间距禁用 100vw**(见 ERR-003):有纵向滚动条时 100vw 偏大一个滚动条宽,用 % / clamp 代替
10. 外部 SVG 做素材时先校验 XML 完整性(网络下载可能被截断,jsdelivr 大文件曾缺尾部;用 npm pack 拿完整包),压缩空白时不得吞掉标签间必要分隔
11. **地图打点等坐标类定位禁止目测**(见 ERR-004):百分比必须由数据源计算;容器 aspect-ratio 必须与图片真实比例一致
12. **v-for 动态重渲染(分页/筛选/加载更多)后必须调用 useReveal 返回的 rescan()**(见 ERR-006),否则新节点停留在透明状态
13. **国旗一律用 SVG 图片(flag-icons),禁用 emoji 旗帜**(见 ERR-007):Windows 无旗帜字形,只会显示字母对
14. **数据库/后端仅存中文,API 返回 `{zh}`**:新增内容表列不再建 `_en`;前端取双语字段统一走 `pick()`(缺 en 自动回退 zh),禁止直接 `field.en`
15. **wangEditor 富文本**:Editor 根节点内联 height:100%,定高要放在父容器(RichEditor 根)上;新增 v-html 渲染富文本时逐项核对全局 reset 影响并 `:deep()` 恢复(见 ERR-011);工具栏保持排除图片/视频上传(图片走素材文件名机制)
