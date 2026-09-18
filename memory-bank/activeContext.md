# activeContext.md — 当前上下文

## 当前焦点(2026-09-18)
业务与产品页按画册设备完成归类重做:6 大类 13 款产品全部图文展示。

### 最近变更
- Services 页改版为「左侧列表栏+右侧详情」:左栏按分类分组的产品列表(sticky,选中绿高亮,≤768 折叠为手风琴单组展开),右侧产品大图+分类标签+型号标题+简介+参数表格(表头绿底"设备参数 EQUIPMENT PARAMETERS"+斑马纹行);点击切换联动;数据层新增 productParams(按型号索引的双语参数行,画册参数表转录:YK-6/FC/3 系全表 16-18 行、YK-AL-1 源站全表、视觉检测与汽车轻量化简表)
- Services 页重做:数据层新增 productCategories(src/data/index.js,6 分类×双语+13 产品 model/tag/image/desc);页面按分类分节(编号标签+浅底软隔断交替),产品卡片 3:2 白底图+型号+变体标签+参数描述;底部新增选型咨询 CTA 横带(i18n services.ctaTitle/ctaDesc/ctaBtn 中英);弹性合规(3→2→1 列)
- 归类(依据画册 PDF 设备内容+源站产品目录交叉验证):①光伏边框铝型材自动生产线(YK-6A/6B/6W) ②光伏边框复合材料自动生产线(YK-FC-3C/3D/3J) ③自动码垛机(YK-3E/3F) ④自动上料机(YK-AL-1) ⑤自动视觉检测系统(YK-OL-2I/YK-OF-3I) ⑥汽车轻量化设备(型材拉弯机/自动锁螺母生产线)
- 产品图 13 张(435×288 PNG)从源站 OSS uploadFiles/Products/ 下载入 src/assets/products/;型号-图片配对以源站命名为准
- PDF 提取工具链:scripts/extract-pdf-images.cjs(对象级提取,处理 Flate+DCT 双重压缩过滤器链)、scripts/map-pdf-images.cjs(页面对象→图片映射,经裸 Page 对象序);画册 PDF 中文标题不可提取(CID 无 ToUnicode),产品名以源站 yk-*.php 页面为准
- 验证:build 通过;6 类 13 产品渲染、图全加载(lazy 时序假象已排除)、375 单列零溢出、英文语言正常
- 首页轮播新增第 5 张「现代科技城市」主视觉(gen-hero-city.cjs 生成 hero-city.svg);首图换 banner-home.jpg;主标题三层光影
- 企业精神模块定稿:SPIRIT 标签+引言在标题与词条间(12/30px 间隔)+三行两列绿色词条 clamp(21px,2vw,32px)

## 下一步
- 部署上线(GitHub Pages base);团队真实人员;产品实拍高清图替换(现 435×288 偏小,PDF 内嵌原图 800-1000px 可再提取)

## 决策与考量
- 型号沿用画册 PDF(YK-6A/FC-3C/3E 系)而非源站导航的新一代(YK-7A/FC-5C/5E):图片文件名与 PDF 型号一一对应,且任务依据为画册内容
- YK-6E 无独立产品图,并入系列描述不单列;YK-OF-3I 用源站 yk-ol-3i_banner.png(源站命名如此)
- `services` 数据保留未动:首页业务卡片仍消费它;Services 页改用新 productCategories

## 上一焦点概要
- 2026-09-18 页脚改版(绿色主题/全称/源站联系方式/二维码)+企业文化模块移除+全站弹性布局改造(AGENTS.md v1.2);ERR-001/ERR-002 见 errorlog
