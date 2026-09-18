## About 页"公司简介"下方插入公司宣传片

1. **素材**:复制 `D:\OneDrive\桌面\网站\image\introduce.mp4` → `src/assets/video/introduce.mp4`
2. **页面**:About.vue 在公司简介区块(profile)之后、使命愿景之前插入"宣传片"区块——居中标题(i18n `about.videoTitle`,中英文案)+ 16:9 圆角视频播放器(`<video controls preload="metadata">`,宽满容器)
3. **验证收尾**:build → 浏览器检查视频加载与显示 → P4 更新 activeContext → P5 提交推送汇报哈希