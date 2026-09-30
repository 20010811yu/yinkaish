## 当前焦点(2026-09-30):数据库与后端仅存中文(已完成,待浏览器复核转🟢)
用户要求库中不再存英文。已落地:① schema/seed 全部去 `_en` 列(7 表 17 列已用 ALTER TABLE DROP COLUMN 从线上库删除,admins 表不动);② 后端 5 路由只查 `_zh`,API 返回 `{zh}`(前端 pick() 缺 en 自动回退 zh,src/data/lang.js);③ admin 5 页删英文输入框、校验只留中文必填,i18n 清理 *En key 并去"(中)"后缀;④ curl 实测 5 公开接口中文 UTF-8 无 en 字段、登录+admin news 列表+参数组回读正常。npm run build 通过。
下一步:新闻正文富文本编辑器(wangEditor,已与用户确认选型+渲染端兼容方案)。

## 上一焦点(2026-09-29,概要):管理员端(/admin)交付
admins 表+JWT 多账号登录(默认 admin/admin123);后端 /api/admin/* 鉴权 CRUD(新闻/职位/产品分类/产品/参数/荣誉/伙伴);前端 /admin 独立布局+五个管理页。**注意:news/jobs 主键非自增,后端新增时自动 MAX(id)+1;管理列表 news_date 用 DATE_FORMAT**。暂无图片上传(素材文件名机制)。

## 上一焦点(2026-09-28,概要)
- 申请职位弹框(Careers):el-dialog+el-form,大陆手机号校验/简历附件必填(≤10MB),FormData 提交 Netlify Forms 影子表单 job
- 电话地区选择终态:el-select 51 国平铺(国旗 SVG+国名+区号)+filterable/allow-create,键入区号自动匹配国旗;细节测试注意见归档
- 国旗 emoji 改 SVG(ERR-007);新闻迷你日历标题放大;页脚高度×0.8

## 上一焦点(2026-09-28 前概要)
- 新闻页改版(置顶头条+3 列网格+分页+迷你日历,useReveal 翻页重扫 ERR-006)
- 首页服务与合作伙伴模块(20 家 logo 墙);Netlify 双平台部署(base 环境自适应+netlify.toml)
- 弹性布局全站改造(AGENTS.md v1.2 硬约束);大图 sharp 压缩(LQIP);YK-OL-2I 多图查看器
