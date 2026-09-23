# activeContext.md — 当前上下文

## 当前焦点(2026-09-22)
Netlify 部署修复:白屏原因是 vite base '/yinkaish/'(GitHub Pages 子路径)在 Netlify 根路径部署下资源 404。改为 `base: process.env.NETLIFY ? '/' : '/yinkaish/'`(Netlify 构建环境自带 NETLIFY 变量) + 新增 netlify.toml(npm run build / dist / SPA 通配回退 200);NETLIFY=true 本地构建验证资源已指向 /assets/。GitHub Pages 与 Netlify 双平台共存,同一构建两边兼容。站点 https://yinkai.netlify.app

### 最近变更
- **光伏板持续仿真迭代(用户多轮反馈)**:深蓝电池片渐变+铝边框板厚+地面投影→倾角改**左低右高约 20°(朝向太阳,物理自洽)**、分栅线按平行四边形边线线性插值精确铺满、支架改**双立柱+导轨+斜撑**真实倾斜安装结构;后移除小板;**最终定稿:面板正对屏幕、顶部向后倾(下宽上窄梯形透视),左侧轻微内倾(顶边 140,95-272,95 非对称),正面双柱支架**;太阳呼吸幅度加大(射线 opacity 1↔0.12+缩放、中心圆 1↔0.78+亮度)
- **CTA 动画改版**:定稿为**色块纯背景层+SVG 顶层横跨**(z-index 0/1),光伏板+太阳线条动画铺满视觉区;组件自带 IntersectionObserver 触发 revealed;Home/Services 共用
- **顺手修 Navbar 375 档横向溢出 14px(存量问题,ERR-006)**:.navbar__brand 漏加 min-width:0(当年只给了 brand-text)+name nowrap 不可截断;补 min-width:0+name ellipsis;320-375 中英双语溢出全部清零
- **大图压缩解决加载慢**:scripts/compress-images.cjs(sharp)——timeline 11 张(限宽 1400/q78,png 照片转 jpg,data 导入同步改名)+首页轮播 6 张(限宽 1920/q75),共 11.5MB→1.9MB;dist 46MB→37MB(其余 31MB 为宣传片,本机无 ffmpeg 未压缩,挂账);banner-sunrise 已不被引用(轮播 s2 用的 banner-pv)
- YK-6W 产品图替换:用户供图(850×495 产线实拍)sharp 限宽 800 q80 覆写 yk-6w_banner.jpg(20KB),与 YK-6B 不再同图
- 联系表单接入 Netlify Forms:index.html 影子表单(name=contact, data-netlify, hidden)+Contact.vue submit 改 fetch POST / (URLSearchParams: form-name+四字段),失败 ElMessage.error(i18n contact.form.fail 中英);收件通知已由用户在 Netlify 后台配置(lukecao@ykautomus.com + lujiacao@163.com);**表单仅在 Netlify 站生效,GitHub Pages 版提交会失败提示**
- 邮箱定稿:contact.email=lukecao@ykautomus.com、contact.email2=lujiacao@163.com(双包+页脚+联系页均两行展示;{'@'} 转义);原 caolujia@yinkaish.cn 已删除
- 删除旧邮箱 lujiacao@163.com 后用户要求撤销(revert e75c1e9),页脚/联系页/双语言包已恢复展示该邮箱
- Netlify 部署配置:vite base 环境自适应 + netlify.toml(构建命令/发布目录/SPA 通配回退)
- 首页新增「服务与合作伙伴」模块(核心优势之后、CTA 之前):上两栏(左列 tag「服务与合作伙伴」+标题+电路连线+说明段;右列伙伴墙 4×5 细边框格子 hover 绿) + 下部通栏世界地图(品牌绿渐变+五个地点脉冲标记:上海·总部/美国/埃及/印度/马来西亚,位置百分比目测校准,≤768 只留上海标签并翻到圆点左侧)。合作伙伴名单以源站 www.yinkaish.com 首页合作伙伴区为准:20 张 logo(阿里云 OSS images/logo/1-20.png,光伏产业链客户:鑫铂股份/晶科能源/德毅隆/CIRS/鸿盛/晶科科技/合肥科晶/爱康/源盛金属/源盛/科蓝特/复睿金属/江苏月嘉/生信/高瓴新材料/艾纳新能源/中信博/平煤隆基/创佳型材,第 17 号 logo 无文字用通用 alt)下载入 src/assets/partners/;data 新增 partners(import.meta.glob 导入,含双语 name);地图素材 world-map.png(91KB,源自 npm @svg-maps/world v2.0.0 **CC-BY-4.0**,已降坐标精度/删微小岛屿/渲染为 2000px PNG,署名见 src/assets/CREDITS.md);i18n home.partners.*(中英);prefers-reduced-motion 降级;新增 home.partners 区块复用 [data-reveal]。Wikimedia SVG 直连被网络重置,改用 npm 包
- **修复导航 1280 横向溢出 7px**:品牌区 margin-left 用 100vw(含 15px 滚动条宽度)致总宽超视口;改 calc(100%/6 - 110px) 用容器百分比。**教训:vw 单位在出现滚动条的页面必然偏大,布局间距禁用 100vw 改 %**
- 视觉检测轮播背景替换:用户横版裁切图(3888×1797)限宽 2560 压缩为 banner-vision.jpg(269KB,替代原 png);文案不变
- 产品图全面换为本地设备图片库(用户资料 D:\OneDrive\桌面\网站\image\设备):10 款替换(YK-6A/6B←6E图/6W/FC-3C/3D/3J/3E/3F/OF-3I←YK-OL-3I_1/锁螺母←自锁螺母),sharp 裁白边限宽 800,7 款改 .jpg 扩展名(data 导入同步);YK-6B 与 6W 的库图为同一文件(资料库本身如此);拉弯机与 AL-1 库内无图保留原图;scripts/replace-product-images.cjs 可复跑
- YK-OL-2I 查看器悬停暂停:鼠标悬停图片时自动轮播暂停(figHover),移开后恢复 3.5s 节拍
- YK-OL-2I 详情图改为多图查看器:用户图片库(设备/视觉检测/YK-OL-2I/1-5.png,sharp 限宽 1200 palette PNG 共 1.6MB)入 src/assets/products/yk-ol-2i/;data 用 import.meta.glob 按文件名序导入 images 数组;Services 详情区单张显示+左右箭头+「n/5」计数+3.5s 自动轮播(切产品归零,无缩略图);其他型号单图不受影响
- YK-OL-2I 产品简介更新:改为「设备与上一工位对接…自动检测长度/漏加工/外观瑕疵…分类输送到下一工位」(用户提供的对接流程描述,中英)
- 轮播顺序调换:第 4 张=焊装交钥匙(car.jpg)、第 5 张=寅铠精神(cooperation);左右切换箭头放大(36→56px,黑 35% 底白字,≤768 44px)
- 首页移除「新闻动态」板块(模板/NewsCard 导入/latestNews/.news-list 样式);/news 页与 data 中 news 数据保留
- 首页员工统计 200+→150+(与 About 页一致)
- 首页轮播新增第 5 张「汽车焊装交钥匙」:用户供图 car_.jpg(7360×4230,5.7MB)压缩至 2560 宽 293KB 入 src/assets/banner-car.jpg;文案 s5「焊装交钥匙，智造白车身」/s5sub「服务大众、通用、上汽的焊装线智造伙伴」(中英);追加末位
- 删除轮播第 5 张科技城市(hero-city.svg 与 home.carousel.s5 从轮播移除,i18n 清理);hero-city.svg 保留——优势板块右列插画仍引用
- 首页轮播切换间隔 5s→3s(:interval=3000)
- 动画改为每次进入视口都重播(用户要求):观察器去掉 unobserve——进入加 .revealed 并重跑计数,离开移除 .revealed 并把计数立即 snap 回终值(dataset.final 缓存终值+_counting 防重+可重入清理);修复后台冻结导致的计数滞留中间值(±0.0mm/8%)问题
- 首页动画改造(方案一+二):①全局 [data-reveal] 滚动入场工具(main.css,IntersectionObserver+.revealed,1-3 档错峰) ②大数字计数(±0.1mm/98% 解析 i18n 数字缓动滚动;interval 驱动+document.hidden/visibilitychange 兜底跳终值——后台标签页定时器会被冻结) ③优势区电路连线 SVG 描边绘制+端点脉冲 ④hero-city.svg 内置微动效(gen 脚本内嵌 style:窗户闪烁/光柱升降/星星闪烁,种子不变构图不变) ⑤城市图滚动视差(rAF 节流 translateY);全部尊重 prefers-reduced-motion;计数动画在后台标签页直接跳终值属预期行为
- 首页「为什么选择寅铠」板块重做(参照正泰官网):左文右图两栏——左列 tag+左对齐大标题+电路连线 SVG+绿色标语+说明段+大数字统计(±0.1mm 加工精度/98% 无故障运行率,顶部细线+大数字,画册参数);右列 hero-city.svg 城市插画(圆角+阴影);4 条优势移至下方一行四列轻量排布(顶部细线+编号,去卡片边框);新增 i18n home.advantages.slogan/lead/stat1-stat2(中英);≤768 单列、≤1024 收窄
- 首页「为什么选择寅铠」板块重做(参照正泰官网):左文右图两栏——左列 tag+左对齐大标题+电路连线 SVG(折线+端点圆)+绿色标语+说明段+大数字统计(±0.1mm 加工精度/98% 无故障运行率,顶部细线+大数字,画册参数);右列 hero-city.svg 城市插画(圆角+阴影);4 条优势移至下方一行四列轻量排布(顶部细线+编号,去卡片边框);新增 i18n home.advantages.slogan/lead/stat1-stat2(中英);≤768 单列、≤1024 收窄
- 撤销 Services 页头引导语(heroLead 已从模板/样式/i18n 移除,页头恢复标题+副标题)
- 底部 CTA 横幅去背景(用户要求全站检查):Home .cta 与 Services .cta-band 两处绿渐变改为 var(--c-bg) 白底,标题/描述改深色系(其余页面无绿色横幅);绿色胶囊按钮保留为视觉锚点
- 产品图高清化:10 款(YK-6A/6W/FC-3C/3D/3J/3E/3F/拉弯机/OL-2I/OF-3I)换为画册 PDF 内嵌原图(sharp 裁白边+白底+限宽 800,sRGB),文件名不变;配对依据 PDF 内容流 cm 绘制坐标(跨页左半=第一个型号);scripts/upgrade-product-images.cjs 可复跑;YK-6B/AL-1/锁螺母 3 款原图在 JP2 复合图内无法解码,保留源图 435×288
- **修复路由 base 缺失**:createWebHistory() 未传 BASE_URL,base '/yinkaish/' 下深链被兜底重定向回首页;改 createWebHistory(import.meta.env.BASE_URL)
- 部署准备:vite.config base '/yinkaish/';新增 .github/workflows/deploy.yml(npm ci→build→cp 404.html→upload/deploy-pages);本地 preview 验证 /yinkaish/services 深链 200 且渲染完整(18 参数行/零破图/零溢出)
- 修复 Services 页 CTA 横带样式缺失(重写时 scoped 遗漏 .cta-band 定义,渲染为白底左对齐裸文本):补回绿渐变+居中,描述限宽 760px 保证单行;**教训:重写页面时模板与样式要成对迁移,build 前比对模板引用的类名是否都有样式定义**
- Services 页改版为「左侧列表栏+右侧详情」:左栏按分类分组的产品列表(sticky,选中绿高亮,≤768 折叠为手风琴单组展开),右侧产品大图+分类标签+型号标题+简介+参数表格(表头绿底"设备参数 EQUIPMENT PARAMETERS"+斑马纹行);点击切换联动;数据层新增 productParams(按型号索引的双语参数行,画册参数表转录:YK-6/FC/3 系全表 16-18 行、YK-AL-1 源站全表、视觉检测与汽车轻量化简表)
- Services 页重做:数据层新增 productCategories(src/data/index.js,6 分类×双语+13 产品 model/tag/image/desc);页面按分类分节(编号标签+浅底软隔断交替),产品卡片 3:2 白底图+型号+变体标签+参数描述;底部新增选型咨询 CTA 横带(i18n services.ctaTitle/ctaDesc/ctaBtn 中英);弹性合规(3→2→1 列)
- 归类(依据画册 PDF 设备内容+源站产品目录交叉验证):①光伏边框铝型材自动生产线(YK-6A/6B/6W) ②光伏边框复合材料自动生产线(YK-FC-3C/3D/3J) ③自动码垛机(YK-3E/3F) ④自动上料机(YK-AL-1) ⑤自动视觉检测系统(YK-OL-2I/YK-OF-3I) ⑥汽车轻量化设备(型材拉弯机/自动锁螺母生产线)
- 产品图 13 张(435×288 PNG)从源站 OSS uploadFiles/Products/ 下载入 src/assets/products/;型号-图片配对以源站命名为准
- PDF 提取工具链:scripts/extract-pdf-images.cjs(对象级提取,处理 Flate+DCT 双重压缩过滤器链)、scripts/map-pdf-images.cjs(页面对象→图片映射,经裸 Page 对象序);画册 PDF 中文标题不可提取(CID 无 ToUnicode),产品名以源站 yk-*.php 页面为准
- 验证:build 通过;6 类 13 产品渲染、图全加载(lazy 时序假象已排除)、375 单列零溢出、英文语言正常
- 首页轮播新增第 5 张「现代科技城市」主视觉(gen-hero-city.cjs 生成 hero-city.svg);首图换 banner-home.jpg;主标题三层光影
- 企业精神模块定稿:SPIRIT 标签+引言在标题与词条间(12/30px 间隔)+三行两列绿色词条 clamp(21px,2vw,32px)

## 下一步
- 宣传片压缩(31MB→5-8MB):需安装 ffmpeg(1080p CRF23+faststart+poster 帧);团队真实人员;Netlify 自定义域名(可选)

## 决策与考量
- 型号沿用画册 PDF(YK-6A/FC-3C/3E 系)而非源站导航的新一代(YK-7A/FC-5C/5E):图片文件名与 PDF 型号一一对应,且任务依据为画册内容
- YK-6E 无独立产品图,并入系列描述不单列;YK-OF-3I 用源站 yk-ol-3i_banner.png(源站命名如此)
- `services` 数据保留未动:首页业务卡片仍消费它;Services 页改用新 productCategories

## 上一焦点概要
- 2026-09-18 页脚改版(绿色主题/全称/源站联系方式/二维码)+企业文化模块移除+全站弹性布局改造(AGENTS.md v1.2);ERR-001/ERR-002 见 errorlog
