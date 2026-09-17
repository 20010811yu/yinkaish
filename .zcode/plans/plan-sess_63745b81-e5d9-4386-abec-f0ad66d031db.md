## 发展历程改为 About 页纵向图文时间线

1. **撤销首页时间线**:Home.vue 移除 DevTimeline 引用;删除 DevTimeline.vue(功能移至 About)
2. **提取真实图片**:`pdfimages`(poppler)从企业画册 PDF 提取内嵌图片,配合各 PPT 的 ppt/media 图片,人工筛选与各发展阶段匹配的实拍图(工厂/焊装产线/光伏产线/检测设备),复制 4-6 张到 `src/assets/timeline/`
3. **数据**:`src/data/index.js` 的 timeline 数组增加 `image` 字段指向对应图片;补充里程碑描述
4. **About 页纵向图文时间线**:重写 About.vue 的时间线区块——中轴线 + 左右交替的图文卡片(图上文下/图下文上交替),滚动进入视口时淡入动画;移动端单列
5. **验证收尾**:build → 浏览器检查 About 页图文时间线 → P4 更新 activeContext/progress → P5 提交推送汇报哈希