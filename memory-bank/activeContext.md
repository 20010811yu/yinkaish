## 当前焦点(2026-10-23):英文界面动态内容回退中文修复(已完成)
结果:data/index.js 拆双语种子(`*Seed` 导出,reactive 兜底改 cloneData 深拷贝)+ data.js `withEn` 按业务键(新闻/职位 id、伙伴 slug、产品分类 slug/型号/参数 label.zh、荣誉 name.zh)合并 en 回 API 行。build 通过;浏览器实测 EN 新闻列表/详情/职位/产品参数全英文,且证实数据来自 API(行仅 {zh},英文确系合并所得);中文模式与线上静态部署行为不变。详见 ERR-019。
遗留:管理端新增且未同步种子翻译的内容英文下仍回退中文(需补 src/data 种子或恢复库端双语);汽车轻量化两款产品 model 本身为中文(型材拉弯机等,源数据如此,非回归)。
下一步(候选):后端部署到服务器/Serverless 让线上 /api 命中真实数据(部署后英文界面依赖本合并机制);外接 MySQL 或 Netlify Blobs 方案已调研。

## 上一焦点(2026-09-30,概要)
- 管理端安全加固五层落地(security.js:JWT/CORS 白名单/三级限速/helmet/CRUD 校验/富文本消毒);存量 admin/admin123 未改,上线需配 NODE_ENV/JWT_SECRET/FRONTEND_ORIGIN(ERR-016/017)

## 上一焦点(2026-09-28,概要)
- Careers 申请弹框(Netlify Forms 附件提交);电话区号 51 国下拉+国旗 SVG;新闻迷你日历标题放大
