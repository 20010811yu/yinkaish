# activeContext.md — 当前上下文

## 当前焦点(2026-09-18)
全站弹性布局改造完成并写入 AGENTS.md v1.2 规则;4 档宽度 × 8 页面零横向溢出。

### 最近变更
- 企业精神标题上方新增英文标签 SPIRIT(复用 .section-tag,与 PROFILE 胶囊同款;i18n about.spiritTag 中英同为 'SPIRIT')
- 企业精神引言移至标题与词条之间(间隔对齐图二参照:标题→小字 12px、小字→词条 30px,与简介侧 title/lead/stats 同款节奏),原词条下方位置撤销
- 企业精神词条下方曾新增引言「以匠心笃实深耕精工，携创新敬畏智造全球。」(i18n about.spiritLead 中英,17px 灰),本次仅调整位置;企业精神模块 margin-top 48px
- 企业精神仿截图模块定稿:标题复用 .section-title(与「公司简介」等大 2.125rem),词条 clamp(21px,2vw,32px)(≈数字字号 0.75 档,汉字字形占满 em 而数字仅 0.72em,此档视觉高度与数据数字一致),绿色加粗,三行两列每行两词,行距 20px;i18n about.spiritTitle + about.spirit.i1~i6(中英);随侧栏 sticky 浮动
- 撤销数据横幅版式:公司数据改为放进公司简介左侧 sticky 栏(profile__side 内、标题+引言下方)——第一行 2004年·成立+150+·员工,第二行 100+·合作+50+·城市,无背景纯绿色数字 clamp(28px,2.6vw,42px)、行距 38px,2×2 grid,随标题同步 sticky 浮动(复用现有 top:120px);i18n key 不变 about.stats.s1~s4,渲染顺序 stats=['s1','s3','s2','s4']
- About 页公司简介正下方曾加公司数据横幅(.stats-band 绿色渐变),本次撤销改版为上述侧栏样式
- AGENTS.md §11 新增「弹性布局(硬约束)」6 条: max-width 容器/fr-minmax 列宽/clamp 流式尺寸/img-video 兜底/断点统一/四档自查;版本升 v1.2
- AppNavbar:品牌区 margin `calc(100vw/6-110px)` → `max(0px, calc(...))`(小屏不再为负);菜单 margin → clamp(16px,5vw,80px);内边距 → clamp(16px,3vw,40px);链接横 padding 0.625rem;**抽屉菜单断点 768→1024**(7 个 nowrap 链接 769-1100px 放不下);768 补品牌名 1rem
- HeroCarousel:轮播高 780px → clamp(480px,55vw,780px);标题 3.5rem → clamp(1.75rem,1.4rem+2.6vw,3.5rem);装饰线 220px → clamp(120px,30vw,220px);删 768 硬切覆盖
- About:荣誉大图 560px → clamp(340px,45vw,560px);缩略图列 → minmax(150px,190px);时间线图高/脊线 320px → clamp(220px,30vw,320px);年/题/文 38/28/20px → clamp 流式;1024 断点 .vt 放宽 82vw;mvv 补 1024→2 列
- About 相册 ERR-002 修复:.gallery__side/.gallery__viewer 加 min-width:0(横向缩略图行 min-content 撑破 1fr 轨道,375px 溢出 386px)
- main.css:.section/.page-hero 内边距 → clamp;补全局 video max-width:100%;删被 clamp 取代的 768 覆盖块
- Home:统计数字/CTA 标题 → clamp;CTA 内边距 → clamp;Services 视觉块高 → clamp(130px,18vw,180px);Team 孤例断点 600→768;Careers 补 1024→2 列 + job__meta flex-wrap;NewsDetail 正文加 overflow-wrap:anywhere;Footer px 字号→rem + 1024→2 列
- 验证:build 通过;1280/1024/768/375 × 8 页面 scrollWidth==clientWidth 零溢出;1024 汉堡菜单生效、轮播 55vw;375 单列正常

## 下一步
- 部署上线(GitHub Pages 需配 base 路径);团队页替换真实人员;补充产品实拍图

## 决策与考量
- 抽屉菜单断点提到 1024:实测 7 链接+长品牌名在 769-1100px 客观放不下,平板收汉堡是唯一稳妥解(1080/1024/1280 三点宽度计算+截图验证)
- 保留 ≤100px 小控件定宽豁免(logo/日期徽章/箭头/二维码 96px),与规则一致
- 上一任务决策:二维码取自源网站;联系方式「源站信息+保留邮箱」不含网址;版权行不加 ICP 备案号;源站英文页邮箱 lujiacao@yinkaish.com 与本项目 caolujia@yinkaish.cn 不一致,保留后者

## 上一焦点概要
- 2026-09-18 页脚改版:绿色渐变主题(#057842→#04512f)/公司全称/源站联系方式(含传真)/公众号+抖音二维码(src/assets/qrcode/,源自源站 OSS);About 企业文化模块移除
- 2026-09-16~17 品牌化改造与 About 增强:寅铠品牌/绿色主题/轮播/公司简介/宣传片/荣誉相册/纵向时间线;ERR-001 页脚渲染丢失修复;详见 git 历史与 errorlog.md
