## 当前焦点(2026-11-02):首页伙伴墙 logo 全裂修复(已完成)
结果:静态兜底 partners 数据 20 处 `partnerImgs.pN` 引用在 e1fdc27 抽取 assets.js 时键失配(映射键从 pN 变 pN.png),一直被后端水合掩盖;后端停机/纯静态部署即全裂,线上站点自 2026-09-29 起即裂图。修复=index.js 由 partnerLogos 重建短键映射,数据不动。build 通过;preview 静态路径实测 20/20 naturalWidth>0、截图确认。详见 ERR-020。推送后双平台自动重新部署,线上随之恢复。
下一步(候选):后端部署到服务器/Serverless 让线上 /api 命中真实数据;外接 MySQL 或 Netlify Blobs 方案已调研。

## 上一焦点(2026-10-23,概要)
- 英文界面动态内容回退中文修复(ERR-019):水合 withEn 按业务键从静态双语种子合并 en 回 API 行,五模块生效;遗留=管理端新增无种子翻译的内容英文下回退中文,需补 src/data 种子

## 上一焦点(2026-09-30,概要)
- 管理端安全加固五层落地(security.js:JWT/CORS 白名单/三级限速/helmet/CRUD 校验/富文本消毒);存量 admin/admin123 未改,上线需配 NODE_ENV/JWT_SECRET/FRONTEND_ORIGIN(ERR-016/017)

## 上一焦点(2026-09-28,概要)
- Careers 申请弹框(Netlify Forms 附件提交);电话区号 51 国下拉+国旗 SVG;新闻迷你日历标题放大
