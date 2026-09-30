## 当前焦点(2026-09-30):新闻正文富文本编辑器(已完成)
管理端新闻正文 textarea 换 wangEditor(@wangeditor/editor 5 + editor-for-vue 5 @next,用户确认选型):封装 RichEditor.vue(v-model HTML,工具栏无图片/视频上传,语言跟随 locale),AdminNews 弹框加 max-height+body 滚动保矮视口可达;NewsDetail 渲染端兼容(content 以 `<` 开头→v-html,否则沿用 \n 分段,存量 12 条零迁移;列表 list-style: revert 恢复圆点,ERR-011)。浏览器实测:打开→保存→库内容一致,前台富文本/纯文本两路渲染正确。注意:编辑器仅进 /admin 懒加载分包;编辑器键盘交互(Enter 分段/Ctrl+B)在自动化合成事件下不可靠,人工操作正常。
下一步(候选):部署后端到服务器让线上 /api 命中真实数据;图片上传机制。
追加修复(2026-09-30):刷新 /admin 页闪现官网导航/页脚——main.js 改 `router.isReady()` 后挂载(ERR-012),前台深链接刷新同类首帧问题一并消除。

## 上一焦点(2026-09-28,概要)
- 申请职位弹框(Careers):el-dialog+el-form,大陆手机号校验/简历附件必填(≤10MB),FormData 提交 Netlify Forms 影子表单 job
- 电话地区选择终态:el-select 51 国平铺(国旗 SVG+国名+区号)+filterable/allow-create,键入区号自动匹配国旗;细节测试注意见归档
- 国旗 emoji 改 SVG(ERR-007);新闻迷你日历标题放大;页脚高度×0.8

## 上一焦点(2026-09-28 前概要)
- 新闻页改版(置顶头条+3 列网格+分页+迷你日历,useReveal 翻页重扫 ERR-006)
- 首页服务与合作伙伴模块(20 家 logo 墙);Netlify 双平台部署(base 环境自适应+netlify.toml)
- 弹性布局全站改造(AGENTS.md v1.2 硬约束);大图 sharp 压缩(LQIP);YK-OL-2I 多图查看器
