# activeContext.md — 当前上下文

## 当前焦点(2026-09-18)
页脚改版完成:绿色主题、公司全称、源站联系方式、公众号/抖音二维码;About 页企业文化模块已移除。

### 最近变更
- 页脚新增「关注我们」列:微信公众号 + 官方抖音二维码(92×92,源自源站 OSS 图,curl 下载存 src/assets/qrcode/wechat.jpg、douyin.jpg),白底圆角 96px 卡片 + 双语标签;新增 i18n footer.follow/wechat/douyin(中英同步)
- 页脚配色:#12233f 深藏青 → 品牌绿深色渐变 linear-gradient(180deg, #057842, #04512f);grid 改 4 列(1.5fr 0.9fr 1.3fr 1fr),≤768px 单列
- 页脚品牌区 brand.short → brand.full(上海寅铠精密机械制造有限公司),logo 行 16px
- 页脚联系方式对齐源站:contact.address 去邮编、新增 contact.fax('021-69173483'/en '+86-021-69173483')、保留邮箱 caolujia@yinkaish.cn;按用户要求不放网址
- About 页删除企业文化模块:section 模板 + keywords computed + .culture__keywords 样式 + i18n about.cultureTitle/cultureDesc(中英);useI18n 解构同步去掉不再使用的 t
- 源站信息获取:www.yinkaish.com 根路径 302→/en/,中文站在 /cn/,联系页 /cn/contact.php 页脚引用阿里云 OSS 二维码图

## 下一步
- 部署上线(GitHub Pages 需配 base 路径);团队页替换真实人员;补充产品实拍图

## 决策与考量
- 用户确认:二维码取自源网站;联系方式为「源站信息+保留邮箱」且不含网址;版权行保持现状不加 ICP 备案号
- 源站英文页邮箱为 lujiacao@yinkaish.com,与本项目所用 caolujia@yinkaish.cn 不一致,按用户决定保留后者
- 团队成员无真实资料,用岗位型占位避免虚构人名;新闻混排真实事件与合理演绎,标记可替换

## 上一焦点概要
- 2026-09-16~17 品牌化改造:寅铠品牌/绿色主题/logo 导航/HeroCarousel 四张轮播(780px)/弹性根字号/黑体系字体栈/全站 i18n 真实资料改版;ERR-001 页脚渲染丢失修复(@ 转义+minify:false+errorHandler);详见 git 历史与 errorlog.md
- 2026-09-16~17 About 页持续增强:公司简介(5 段卡)/宣传片(introduce.mp4)/公司荣誉(相册式大图+7 证书)/纵向图文时间线(倒序左右交叉+配图);导航位置调整;详见 git 历史
