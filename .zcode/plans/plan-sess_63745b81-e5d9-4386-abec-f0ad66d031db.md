## 官网品牌化改造 + 首页轮播(寅铠精密机械,绿色主题)

### 1. 品牌与视觉
- 公司:上海寅铠精密机械制造有限公司(英文名 Yinkai Precision Machinery);定位改为光伏装备制造(光伏边框自动生产线、视觉检测系统),实施时从 `D:\OneDrive\桌面\网站\info\` 的公司资料(宣传语方案.md、企业画册 PDF、产品 PPT)提取真实业务文案
- 复制素材到项目:`tittle_logo.png` → `src/assets/logo.png`;`pv.png` → `src/assets/banner-pv.png`;`光伏电站日出-宣传背景.png` → `src/assets/banner-sunrise.png`
- 主色改为 logo 绿(#00A651):design tokens 与 Element Plus CSS 变量同步替换,渐变改深绿系;`index.html` 标题更新

### 2. 导航栏/页脚
- AppNavbar、AppFooter 的文字 logo 改为真实 logo 图片 + "寅铠精密 | Yinkai Precision";页脚版权用公司全称

### 3. 首页顶部轮播(仿 chint.net)
- 新建 `src/components/HeroCarousel.vue`,用 `el-carousel` 全宽展示(高度约 520px,移动端自适应)
- 第一张:`banner-pv.png`,标语"寅领行业,铠创未来"(EN: Leading the Industry, Creating the Future);第二张:`banner-sunrise.png` + 配套标语;后续可在 data 中扩展
- 标语居中白字带遮罩,自动轮播 + 指示器 + 左右箭头;首页原 Hero 区块由轮播替代,其余区块保留

### 4. 文案与数据改版(i18n zh/en 同步)
- Home/About/Services/Team/News/Careers/Contact 全部替换为光伏装备制造业务内容(精密加工、智能产线、视觉检测),`src/data/` 数据同步;联系方式用资料中的真实信息(无则占位)

### 5. 验证与收尾
- P3:`npm run build` 通过 + 浏览器检查轮播效果、绿色主题、双语、移动端
- P4:memory-bank 同步(activeContext/progress/systemPatterns 主色)
- P5:自动提交推送,汇报哈希